import { HomeState } from "../../pages/home";

export default class Slider {
    // const canvas = canvasRef.current;
    // private _canvas: React.MutableRefObject<CanvasRenderingContext2D> | null =
    //     null;
    // constructor(canvas: React.MutableRefObject<CanvasRenderingContext2D>) {
    //     if (canvas) {
    //         this._canvas = canvas;
    //     }
    // }

    handleSlide(
        canvas: HTMLCanvasElement,
        currentIndex: React.MutableRefObject<number>,
        isSlideAllowed: React.MutableRefObject<boolean>,
        movementX: React.MutableRefObject<number>,
        sliderX: React.MutableRefObject<number>,
        state: HomeState,
        setState: (s: HomeState) => void
    ) {
        if (!canvas || !isSlideAllowed.current) {
            if (!isSlideAllowed.current) {
                console.log("%cSlide is disallowed", "color:yellow");
            }
            setState({ ...state, isGrabbing: false });
            movementX.current = 0;
            return;
        }
        const absMovementAmount = Math.abs(movementX.current);
        const diff = canvas.width - absMovementAmount;
        if (isSlideAllowed.current) {
            if (movementX.current < 0) {
                sliderX.current -= diff;
                currentIndex.current += 1;
            } else if (movementX.current > 0) {
                sliderX.current += diff;
                currentIndex.current -= 1;
            }
            console.log(
                `%cMoved to slide ${currentIndex.current}`,
                "color:lime"
            );
        } else {
            console.log("%cGonna undo slide", "color:yellow");
            sliderX.current = currentIndex.current * canvas.width * -1;
            console.log(
                `%cReverted SliderX: ${sliderX.current}`,
                "color:yellow"
            );
        }
        setState({
            ...state,
            currentIndex: currentIndex.current,
            isGrabbing: false,
        });
        movementX.current = 0;
    }
}