export function initBodyScrollEngine() {
    const runway = document.querySelector('.scroll-runway');
    const objectElement = document.getElementById('interactiveBody');
    const pills = document.querySelectorAll('.pill-popup');

    console.log("DOM Search Results:", { runway, objectElement, pillsCount: pills.length });

    if (!runway || !objectElement) {
        console.error("Initialization halted: Missing required HTML structural nodes.");
        return;
    }

    const setupEngine = () => {
        console.log("Object element 'load' event fired successfully.");
        
        const svgInternalDoc = objectElement.contentDocument;

        if (!svgInternalDoc) {
            console.error("CORS Security Block: Cannot read contentDocument.");
            return;
        }

        const svgRoot = svgInternalDoc.querySelector('svg') || svgInternalDoc.documentElement;

        const baseTrueX = 467.95;
        const baseTrueY = -36.096;
        const baseWidth = 1624.1;
        const baseHeight = 1672.192;

        let targetProgress = 0;   
        let smoothedProgress = 0; 
        const easeFactor = 1;

        window.addEventListener('scroll', () => {
            const rect = runway.getBoundingClientRect();
            const runwayTopFromPageTop = window.scrollY + rect.top;

            const startLineOffset = window.innerHeight * 0.30; 
            const currentScrolledPosition = window.scrollY - runwayTopFromPageTop + startLineOffset;
            const totalScrollableDistance = rect.height - window.innerHeight + startLineOffset;

            if (totalScrollableDistance <= 0) return;

            const rawRatio = currentScrolledPosition / totalScrollableDistance;
            targetProgress = Math.min(Math.max(rawRatio, 0), 1);
        }, { passive: true });

        function updateSmoothFrame() {
            smoothedProgress += (targetProgress - smoothedProgress) * easeFactor;

            if (Math.abs(targetProgress - smoothedProgress) > 0.0001) {
                renderScene(smoothedProgress);
            } else {
                smoothedProgress = targetProgress;
                renderScene(smoothedProgress);
            }

            requestAnimationFrame(updateSmoothFrame);
        }

        function renderScene(progress) {
            let currentX, currentY, currentWidth, currentHeight;
            const zoomFactor = 0.35; 
            
            // ==========================================
            // THE NEW THREE-PHASE PERSPECTIVE MATRIX
            // ==========================================
            
            // PHASE 1: Zooming In (0.0 -> 0.30)
            if (progress <= 0.30) {
                const stage1Progress = progress / 0.30;
                
                currentWidth = baseWidth - (stage1Progress * (baseWidth * (1 - zoomFactor)));
                currentHeight = baseHeight - (stage1Progress * (baseHeight * (1 - zoomFactor)));
                
                const targetX = baseTrueX + (baseWidth * ((1 - zoomFactor) / 2));
                currentX = baseTrueX + (stage1Progress * (targetX - baseTrueX));
                currentY = baseTrueY + (stage1Progress * (baseHeight * 0.02));
            } 
            // NEW BUFFER GAP PHASE: Locked Camera Window (0.30 -> 0.45)
            else if (progress > 0.30 && progress <= 0.45) {
                // Freeze the camera completely at the exact end-frame of Phase 1
                currentWidth = baseWidth * zoomFactor;
                currentHeight = baseHeight * zoomFactor;
                currentX = baseTrueX + (baseWidth * ((1 - zoomFactor) / 2)); 
                currentY = baseTrueY + (baseHeight * 0.02); // Kept completely static
            }
            // PHASE 2: Resumed Panning Down (0.45 -> 1.00)
            else {
                // Map the remaining scroll track (0.45 to 1.0) cleanly from 0 to 1
                const stage2Progress = (progress - 0.45) / 0.55;
                
                currentWidth = baseWidth * zoomFactor;
                currentHeight = baseHeight * zoomFactor;
                currentX = baseTrueX + (baseWidth * ((1 - zoomFactor) / 2)); 
                
                const startPanY = baseTrueY + (baseHeight * 0.02);
                const totalPanDistance = baseHeight * 0.55; 
                currentY = startPanY + (stage2Progress * totalPanDistance);
            }

            // 1. Commit layout position properties to the SVG asset root
            svgRoot.setAttribute('viewBox', `${currentX} ${currentY} ${currentWidth} ${currentHeight}`);

            // 2. Map HTML elements and evaluate active visibility window ranges
            const objectRect = objectElement.getBoundingClientRect();
            
            pills.forEach(pill => {
                const pillX = parseFloat(pill.getAttribute('data-x'));
                const pillY = parseFloat(pill.getAttribute('data-y'));

                const percentX = (pillX - currentX) / currentWidth;
                const percentY = (pillY - currentY) / currentHeight;

                const screenX = objectRect.left + (percentX * objectRect.width);
                const screenY = objectRect.top + (percentY * objectRect.height);

                pill.style.left = `${screenX}px`;
                pill.style.top = `${screenY}px`;

                // Hide all overlay components completely during the zoom-in execution
                if (progress <= 0.30) {
                    pill.classList.remove('visible');
                    return;
                }

                // Geometric boundary verification checks
                const delayFactor = parseFloat(pill.getAttribute('data-delay-factor') || "0");
                const baseArrivalPercent = 0.15; 
                const departurePercent = 0.98;   

                const triggerArrivalLine = window.innerHeight * (baseArrivalPercent + delayFactor);
                const triggerDepartureLine = window.innerHeight * departurePercent;

                if (screenY >= triggerArrivalLine && screenY <= triggerDepartureLine) {
                    pill.classList.add('visible');
                } else {
                    pill.classList.remove('visible');
                }
            });
        }

        requestAnimationFrame(updateSmoothFrame);
    };

    if (objectElement.contentDocument && objectElement.contentDocument.readyState === 'complete') {
        setupEngine();
    } else {
        objectElement.addEventListener('load', setupEngine);
    }
}