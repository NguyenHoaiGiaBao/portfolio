function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const element = document.querySelector(".container");

    html2canvas(element, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("portrait", "mm", "a4");
        const imgWidth = 210; // Chiều rộng A4
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("my-cv.pdf");
    });
}

document.getElementById("exportBtn").addEventListener("click", exportToPDF);