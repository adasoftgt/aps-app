import React from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import empresaLogo from './apsfarma-removebg-preview.png'; // Importar el logo de la empresa


const GeneratePDF = async () => {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]); // Tamaño carta (8.5x11 pulgadas)

    // Añadir logo de la empresa
    const empresaLogoBytes = await fetch(empresaLogo).then(res => res.arrayBuffer());
    const empresaImage = await pdfDoc.embedPng(empresaLogoBytes);
    page.drawImage(empresaImage, {
        x: 50,
        y: 720,
        width: 100,
        height: 50,
    });

    // Añadir membrete con información de la empresa
    page.drawText('Nombre de la Empresa', {
        x: 180,
        y: 750,
        size: 14,
        font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
        color: rgb(0, 0, 0),
    });

    page.drawText('Dirección de la Empresa', {
        x: 180,
        y: 730,
        size: 12,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
        color: rgb(0, 0, 0),
    });

    page.drawText('Teléfono: xxx-xxx-xxxx', {
        x: 180,
        y: 710,
        size: 12,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
        color: rgb(0, 0, 0),
    });

    // Añadir título de la factura
    page.drawText('Factura', {
        x: 50,
        y: 670,
        size: 24,
        font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
        color: rgb(0, 0, 0),
    });

    // Añadir detalles de la factura
    page.drawText('Cliente: Cliente Ejemplo', {
        x: 50,
        y: 630,
        size: 12,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
        color: rgb(0, 0, 0),
    });

    page.drawText('Fecha: 17 de marzo de 2024', {
        x: 50,
        y: 610,
        size: 12,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
        color: rgb(0, 0, 0),
    });

    // Añadir los elementos de la factura
    const items = [
        { description: 'Producto 1', quantity: 2, price: 10 },
        { description: 'Producto 2', quantity: 1, price: 20 },
        { description: 'Producto 3', quantity: 3, price: 15 },
    ];

    let yPosition = 590;
    for (const item of items) {
        page.drawText(item.description, {
            x: 50,
            y: yPosition,
            size: 12,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: rgb(0, 0, 0),
        });

        page.drawText(`Cantidad: ${item.quantity}`, {
            x: 250,
            y: yPosition,
            size: 12,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: rgb(0, 0, 0),
        });

        page.drawText(`Precio unitario: $${item.price}`, {
            x: 350,
            y: yPosition,
            size: 12,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: rgb(0, 0, 0),
        });

        page.drawText(`Subtotal: $${item.quantity * item.price}`, {
            x: 450,
            y: yPosition,
            size: 12,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: rgb(0, 0, 0),
        });

        yPosition -= 20;
    }

    // Calcular el total
    const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    page.drawText(`Total: $${total}`, {
        x: 450,
        y: yPosition,
        size: 12,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
        color: rgb(0, 0, 0),
    });

    // Guardar el PDF como un blob
    const pdfBytes = await pdfDoc.save();

    // Crear un objeto de URL para el blob PDF
    const pdfURL = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));

    // Abrir el PDF en una nueva pestaña del navegador
    window.open(pdfURL);
};

const InvoicePDF = () => {
    return (
        <div>
            <button onClick={GeneratePDF}>Generar factura PDF</button>
        </div>
    );
};

export default InvoicePDF;
