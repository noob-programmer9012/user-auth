import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";

export const createPDF = ({ ...data }, req, res, next) => {
  const fileName = `${data._doc.challanNumber}`;
  // const filePath = path.join(
  //   import.meta.dirname,
  //   "..",
  //   "data",
  //   "challans",
  //   fileName
  // );

  const doc = new PDFDocument({ size: "A4" });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename=${fileName}`);
  // doc.pipe(fs.createWriteStream(filePath));
  doc.pipe(res);
  doc.rect(10, 25, 580, 150).stroke("black"); // top rect
  doc.rect(10, 180, 580, 650).stroke("black"); // bottom rect
  doc // bottom rect first vertical line
    .moveTo(60, 180) // set the current point
    .lineTo(60, 830) // draw a line
    .stroke();
  doc // bottom rect second vertical line
    .moveTo(380, 180) // set the current point
    .lineTo(380, 830) // draw a line
    .stroke();
  doc // bottom rect third vertical line
    .moveTo(450, 180) // set the current point
    .lineTo(450, 830) // draw a line
    .stroke();

  doc // bottom rect Horizontal line
    .moveTo(10, 220) // set the current point
    .lineTo(590, 220) // draw a line
    .stroke();
  doc.fontSize(32).text(`${data._doc.firmId.companyName}`, { align: "center" });
  doc
    .fontSize(16)
    .text(
      `${data._doc.firmId.address.line1} ${data._doc.firmId.address.line2}, ${data._doc.firmId.address.line3}`,
      { align: "center" }
    );
  doc.text("Sr.\nNo", 20, 185);
  doc.text("Product List", 100, 192);
  doc.text("Qty", 390, 190);
  doc.text("Price", 460, 190);

  let a = 185,
    b = 192,
    c = 190;
  let x = 50;

  const length = data._doc.products.length;

  for (let i = 0; i < length; i++) {
    doc.text(`${i + 1}`, 20, a + x);
    doc.text(`${data._doc.products[i].productId.productName}`, 100, b + x);
    doc.text(`${data._doc.products[i].quantity}`, 390, c + x);
    doc.text(`${data._doc.products[i].rate}`, 460, c + x);
    x += 50;
  }

  return doc.end();
};
