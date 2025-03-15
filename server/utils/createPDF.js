import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";

const template = ({ ...data }, doc) => {
  doc.rect(10, 25, 580, 150).stroke("black"); // top rect
  doc.rect(10, 180, 580, 650).stroke("black"); // bottom rect
  doc // bottom rect first vertical line
    .moveTo(60, 180) // set the current point
    .lineTo(60, 790) // draw a line
    .stroke();
  doc // bottom rect second vertical line
    .moveTo(350, 180) // set the current point
    .lineTo(350, 790) // draw a line
    .stroke();
  doc // bottom rect third vertical line
    .moveTo(400, 180) // set the current point
    .lineTo(400, 790) // draw a line
    .stroke();
  doc // bottom rect fourth vertical line
    .moveTo(480, 180) // set the current point
    .lineTo(480, 830) // draw a line
    .stroke();

  doc // bottom rect Horizontal line
    .moveTo(10, 220) // set the current point
    .lineTo(590, 220) // draw a line
    .stroke();
  const initials = data._doc.firmId.companyName.split(" ").map(x => x[0]).join(".");
  doc.fontSize(16).text(`${initials}`, 50, 50, { underline: true, characterSpacing: 2 });
  doc.fontSize(26).text(`${data._doc.clientId.companyName}`, { align: "center" });
  doc
    .fontSize(16)
    .text(
      `${data._doc.clientId.address.line3}`,
      { align: "center" }
    );
  doc.fontSize(16).text(`Date: ${data._doc.challanDate.toLocaleDateString('en-IN')}`, 450, 130, { width: 200 });
  doc.fontSize(16).text(`Challan No.: ${data._doc.challanNumber}`, 450, 150, { width: 200 });
  doc.text("Sr.\nNo", 20, 185);
  doc.text("Product List", 70, 192);
  doc.text("Qty", 360, 190);
  doc.text("Price", 410, 190);
  doc.text("Total", 490, 190, { width: 100 });

  doc // bottom rect Second Horizontal line
    .moveTo(10, 790) // set the current point
    .lineTo(590, 790) // draw a line
    .stroke();
}

const addDoc = (data, doc) => {
  doc.addPage();
  template(data, doc);
}

export const createPDF = ({ ...data }, _req, res, _next) => {
  const fileName = `${data._doc.challanNumber}.pdf`;
  // const filePath = path.join(
  //   import.meta.dirname,
  //   "..",
  //   "data",
  //   "challans",
  //   fileName
  // );

  const doc = new PDFDocument({ size: "A4" });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  // doc.pipe(fs.createWriteStream(filePath));
  doc.pipe(res);
  // await new Promise((resolve) => resolve(template(data, doc)))

  template(data, doc);
  let a = 185, x = 50;

  const length = data._doc.products.length;
  const totalPrice = [];

  for (let i = 0; i < length; i++) {
    doc.text(`${i + 1}`, 20, a + x);
    doc.text(`${data._doc.products[i].productId.productName}`, 70, a + x);
    doc.text(`${data._doc.products[i].quantity}`, 360, a + x);
    doc.text(`${data._doc.products[i].rate}`, 410, a + x);
    const total = data._doc.products[i].rate * data._doc.products[i].quantity;
    totalPrice.push(total);
    doc.text(`${total}`, 490, a + x, { width: 100 })
    x += 30;

    // check if x > page_length, if so add new pdf document and reset x (pending)
    if (a + x > 750) {
      x = 50;
      addDoc(data, doc);
    };
  }

  doc
    .fontSize(16)
    .text(`Total Amount`, 370, 805, { height: 10, width: 150 });
  let total_amount = totalPrice.reduce((sum, num) => sum + num, 0);
  doc
    .fontSize(16)
    .text(`${total_amount}/-`, 490, 805, { height: 10, width: 150 });

  return doc.end();
};
