import React from 'react';
import globalMessages from '../globalMessages';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button } from 'reactstrap';
import jsPDF from "jspdf";
import "jspdf-autotable";

function exportPDF(title, data, columns, footerData, footerColumns, cellWidth, fontSize) {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "portrait"; // portrait or landscape
  const dt = new Date();
  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);
  doc.text(title, marginLeft, 100);

  doc.autoTable(generatetablecontent(columns, data, 110, cellWidth, fontSize));

  if(footerData){
    for (let i = 0; i < footerData.length ; i ++){
      const values = [];
      values.push(footerData[i])
      doc.autoTable(generatetablecontent(footerColumns[i], values, null, cellWidth, fontSize));
    }
  }
  addHeaders(title, doc, marginLeft);
  addFooters(doc, dt);

  doc.save(`${title.replaceAll(" ","-").toLowerCase()}-${
    dt.getFullYear().toString().padStart(4, '0')}${
    (dt.getMonth()+1).toString().padStart(2, '0')}${
    dt.getDate().toString().padStart(2, '0')}.pdf`);
}

const addHeaders = (title, doc, marginLeft) => {
  const pageCount = doc.internal.getNumberOfPages();
  let img = new Image();
  img.src = 'img/text_logo_light.png';
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFillColor(246, 153, 29);
    doc.rect(10, 10, doc.internal.pageSize.width - 20, 70, "F");
    doc.addImage(img, 'png', marginLeft, 20, 260, 50);
  }
}

const addFooters = (doc, dt) => {
  const pageCount = doc.internal.getNumberOfPages()
  doc.setFontSize(8)
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.text('Página ' + String(i) + ' de ' + String(pageCount), doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10, {
      align: 'right'
    })

    doc.text(`${
      dt.getDate().toString().padStart(2, '0')}/${
      (dt.getMonth()+1).toString().padStart(2, '0')}/${
      dt.getFullYear().toString().padStart(4, '0')} ${
      dt.getHours().toString().padStart(2, '0')}:${
      dt.getMinutes().toString().padStart(2, '0')}:${
      dt.getSeconds().toString().padStart(2, '0')}`,
      10, doc.internal.pageSize.height - 10, {
        align: 'left'
      });
  }
}

function generatetablecontent(columns, data, startY, cellWidth, fontSize){
  const headerParse = columns.map(elt=> elt.label);
  const headers = [];
  headers.push(headerParse);

  const columnStyles = [];
  for (let i = 0 ; i < columns.length ; i++)
    columnStyles.push({ cellWidth: cellWidth, fontSize: fontSize,});

  const dataFormat = data.map(elt=> {
    const values = [];
    Object.values(elt).map(column => (
      values.push(column)
    ))
    return values;
  });

  return {
    startY: startY,
    head: headers,
    body: dataFormat,
    headStyles: {
      fontSize: fontSize,
      fillColor: [246, 153, 29]
    },
    margin: {right: 60, top: 100},
    columnStyles: columnStyles,
  };
}

export default function ReportPDF({ ...props }) {
  const { title, data, columns, footerData, footerColumns, cellWidth, fontSize } = props;
  const { formatMessage } = useIntl();

  return (
    <Button
      color="link"
      onClick={() => exportPDF(title, data, columns, footerData, footerColumns, cellWidth, fontSize)}
      color={'link'}
    >
      {formatMessage(globalMessages.downloadPDF)}
    </Button>
  );
}
