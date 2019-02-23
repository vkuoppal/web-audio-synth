function stylizeCanvas(
  canvasContext: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const gradient = canvasContext.createRadialGradient(
    width / 2,
    height / 2,
    25,
    width / 2,
    height / 2,
    height - 5
  );
  gradient.addColorStop(0, "black");
  gradient.addColorStop(1, "rgb(0, 95, 107)");

  canvasContext.fillStyle = gradient;
  canvasContext.fillRect(0, 0, width, height);

  canvasContext.lineWidth = 3;
  canvasContext.strokeStyle = "rgb(181, 82, 92)";
}

export function drawOscilloscope(analyser: AnalyserNode) {
  const canvas = document.querySelector(".oscilloscope") as HTMLCanvasElement;
  const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);

  const { width, height } = canvas;
  canvasContext.clearRect(0, 0, width, height);

  const draw = () => {
    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    stylizeCanvas(canvasContext, width, height);
    canvasContext.beginPath();

    const sliceWidth = width / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const value = dataArray[i] / 32.0;
      const y = (value * height) / 2;
      const yVal = y - 195;
      canvasContext.lineTo(x, yVal);
      x += sliceWidth;
    }

    canvasContext.stroke();
  };

  draw();
}
