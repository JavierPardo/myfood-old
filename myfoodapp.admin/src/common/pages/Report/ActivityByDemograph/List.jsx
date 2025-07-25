import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'reactstrap';
import jsPDF from "jspdf";
import $ from 'jquery';
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import noDataDisplay from "highcharts/modules/no-data-to-display"
import messages from './messages';
import globalMessages from '../../../globalMessages';
import {
  ContentWrapper,
  PageHeader,
} from '../../../components';
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
} from 'reactstrap';
import * as moment from 'moment';
import PieChartCard from "../../../components/PieChartCard";

import useOrdersByZoneReportLastMonthList from './useOrdersByZoneReporLastMonthtList';
import useOrdersByGenderReportLastMonthList from './useOrdersByGenderReportLastMonthList';
import useOrdersByAgeReportLastMonthList from './useOrdersByAgeReportLastMonthList';

import useOrdersByZoneReportThisMonthList from './useOrdersByZoneReporThisMonthtList';
import useOrdersByGenderReportThisMonthList from './useOrdersByGenderReportThisMonthList';
import useOrdersByAgeReportThisMonthList from './useOrdersByAgeReportThisMonthList';


import useReservationsByZoneReportLastMonthList from './useReservationsByZoneReporLastMonthtList';
import useReservationsByGenderReportLastMonthList from './useReservationsByGenderReportLastMonthList';
import useReservationsByAgeReportLastMonthList from './useReservationsByAgeReportLastMonthList';

import useReservationsByZoneReportThisMonthList from './useReservationsByZoneReporThisMonthtList';
import useReservationsByGenderReportThisMonthList from './useReservationsByGenderReportThisMonthList';
import useReservationsByAgeReportThisMonthList from './useReservationsByAgeReportThisMonthList';


import useUsersByZoneReportLastMonthList from './useUsersByZoneReporLastMonthtList';
import useUsersByGenderReportLastMonthList from './useUsersByGenderReportLastMonthList';
import useUsersByAgeReportLastMonthList from './useUsersByAgeReportLastMonthList';

import useUsersByZoneReportThisMonthList from './useUsersByZoneReporThisMonthtList';
import useUsersByGenderReportThisMonthList from './useUsersByGenderReportThisMonthList';
import useUsersByAgeReportThisMonthList from './useUsersByAgeReportThisMonthList';

export default function List() {

  function getThisMonthName (){
    var month = moment().clone().format('MMMM YYYY');
    return month.charAt(0).toUpperCase().toString() + month.slice(1);
  }

  function getLastMonthName (){
    var month = moment().clone().subtract(1, 'months').format('MMMM YYYY');
    return month.charAt(0).toUpperCase().toString() + month.slice(1);
  }

  const initialLastMonthFilter = {
    fromDate: moment().clone().subtract(1, 'months').startOf('month'),
    toDate: moment().clone().subtract(1, 'months').endOf('month'),
  };

  const initialThisMonthFilter = {
    fromDate: moment().clone().startOf('month'),
    toDate: moment().clone().endOf('month'),
  };

  const {
    ordersByZoneReportLastMonth,
    loadingOrdersByZoneReportLastMonth,
    ordersByZoneMetadataLastMonth,
  } = useOrdersByZoneReportLastMonthList(initialLastMonthFilter);

  const {
    ordersByGenderReportLastMonth,
    loadingOrdersByGenderReportLastMonth,
    ordersByGenderMetadataLastMonth,
  } = useOrdersByGenderReportLastMonthList(initialLastMonthFilter);

  const {
    ordersByAgeReportLastMonth,
    loadingOrdersByAgeReportLastMonth,
    ordersByAgeMetadataLastMonth,
  } = useOrdersByAgeReportLastMonthList(initialLastMonthFilter);


  const {
    ordersByZoneReportThisMonth,
    loadingOrdersByZoneReportThisMonth,
    ordersByZoneMetadataThisMonth,
  } = useOrdersByZoneReportThisMonthList(initialThisMonthFilter);

  const {
    ordersByGenderReportThisMonth,
    loadingOrdersByGenderReportThisMonth,
    ordersByGenderMetadataThisMonth,
  } = useOrdersByGenderReportThisMonthList(initialThisMonthFilter);

  const {
    ordersByAgeReportThisMonth,
    loadingOrdersByAgeReportThisMonth,
    ordersByAgeMetadataThisMonth,
  } = useOrdersByAgeReportThisMonthList(initialThisMonthFilter);



  const {
    reservationsByZoneReportLastMonth,
    loadingReservationsByZoneReportLastMonth,
    reservationsByZoneMetadataLastMonth,
  } = useReservationsByZoneReportLastMonthList(initialLastMonthFilter);

  const {
    reservationsByGenderReportLastMonth,
    loadingReservationsByGenderReportLastMonth,
    reservationsByGenderMetadataLastMonth,
  } = useReservationsByGenderReportLastMonthList(initialLastMonthFilter);

  const {
    reservationsByAgeReportLastMonth,
    loadingReservationsByAgeReportLastMonth,
    reservationsByAgeMetadataLastMonth,
  } = useReservationsByAgeReportLastMonthList(initialLastMonthFilter);


  const {
    reservationsByZoneReportThisMonth,
    loadingReservationsByZoneReportThisMonth,
    reservationsByZoneMetadataThisMonth,
  } = useReservationsByZoneReportThisMonthList(initialThisMonthFilter);

  const {
    reservationsByGenderReportThisMonth,
    loadingReservationsByGenderReportThisMonth,
    reservationsByGenderMetadataThisMonth,
  } = useReservationsByGenderReportThisMonthList(initialThisMonthFilter);

  const {
    reservationsByAgeReportThisMonth,
    loadingReservationsByAgeReportThisMonth,
    reservationsByAgeMetadataThisMonth,
  } = useReservationsByAgeReportThisMonthList(initialThisMonthFilter);



  const {
    usersByZoneReportLastMonth,
    loadingUsersByZoneReportLastMonth,
    usersByZoneMetadataLastMonth,
  } = useUsersByZoneReportLastMonthList(initialLastMonthFilter);

  const {
    usersByGenderReportLastMonth,
    loadingUsersByGenderReportLastMonth,
    usersByGenderMetadataLastMonth,
  } = useUsersByGenderReportLastMonthList(initialLastMonthFilter);

  const {
    usersByAgeReportLastMonth,
    loadingUsersByAgeReportLastMonth,
    usersByAgeMetadataLastMonth,
  } = useUsersByAgeReportLastMonthList(initialLastMonthFilter);


  const {
    usersByZoneReportThisMonth,
    loadingUsersByZoneReportThisMonth,
    usersByZoneMetadataThisMonth,
  } = useUsersByZoneReportThisMonthList(initialThisMonthFilter);

  const {
    usersByGenderReportThisMonth,
    loadingUsersByGenderReportThisMonth,
    usersByGenderMetadataThisMonth,
  } = useUsersByGenderReportThisMonthList(initialThisMonthFilter);

  const {
    usersByAgeReportThisMonth,
    loadingUsersByAgeReportThisMonth,
    usersByAgeMetadataThisMonth,
  } = useUsersByAgeReportThisMonthList(initialThisMonthFilter);
  
  const { formatMessage } = useIntl();

  //////////////////////////////////////////////////
  const ChartPie = {
    data: [
      {
        label: "place",
        // color: "#4acab4",
        data: 30,
      },
      {
        label: "holder",
        // color: "#ffea88",
        data: 40,
      },
    ],
  };

  function getZoneNameById(zoneId) {
    if(ordersByZoneMetadataThisMonth != undefined && zoneId != 0)
      return ordersByZoneMetadataThisMonth.zones.find(z => z.id == zoneId)?.zoneName;
    else
      return null;
  }

  function getGenderNameById(genderId) {
    if(ordersByGenderMetadataThisMonth != undefined)
      return ordersByGenderMetadataThisMonth.genders.find(z => z.id == genderId).name;
    else
      return null;
  }

  // function getAgeNameById(ageId) {
  //   if(ordersByAgeMetadata != undefined)
  //     return ordersByAgeMetadata.ages.find(z => z.id == ageId).name;
  //   else
  //     return null;
  // }

  var ordersByZoneReportLastMonthData = [];
  if(ordersByZoneReportLastMonth != undefined){
    ordersByZoneReportLastMonthData = ordersByZoneReportLastMonth.map( function(x, i){
      return { "label": getZoneNameById(x.zoneId), "data": x.amount }
    }.bind(this));
  }

  var ordersByGenderReportLastMonthData = [];
  if(ordersByGenderReportLastMonth != undefined){
    ordersByGenderReportLastMonthData = ordersByGenderReportLastMonth.map( function(x, i){
      return { "label": getGenderNameById(x.genderId), "data": x.amount }
    }.bind(this));
  }

  var ordersByAgeReportLastMonthData = [];
  if(ordersByAgeReportLastMonth != undefined){
    ordersByAgeReportLastMonthData = ordersByAgeReportLastMonth.map( function(x, i){
      return { "label": x.age, "data": x.amount }
    }.bind(this));
  }


  var ordersByZoneReportThisMonthData = [];
  if(ordersByZoneReportThisMonth != undefined){
    ordersByZoneReportThisMonthData = ordersByZoneReportThisMonth.map( function(x, i){
      return { "label": getZoneNameById(x.zoneId), "data": x.amount }
    }.bind(this));
  }

  var ordersByGenderReportThisMonthData = [];
  if(ordersByGenderReportThisMonth != undefined){
    ordersByGenderReportThisMonthData = ordersByGenderReportThisMonth.map( function(x, i){
      return { "label": getGenderNameById(x.genderId), "data": x.amount }
    }.bind(this));
  }

  var ordersByAgeReportThisMonthData = [];
  if(ordersByAgeReportThisMonth != undefined){
    ordersByAgeReportThisMonthData = ordersByAgeReportThisMonth.map( function(x, i){
      return { "label": x.age, "data": x.amount }
    }.bind(this));
  }




  var reservationsByZoneReportLastMonthData = [];
  if(reservationsByZoneReportLastMonth != undefined){
    reservationsByZoneReportLastMonthData = reservationsByZoneReportLastMonth.map( function(x, i){
      return { "label": getZoneNameById(x.zoneId), "data": x.amount }
    }.bind(this));
  }

  var reservationsByGenderReportLastMonthData = [];
  if(reservationsByGenderReportLastMonth != undefined){
    reservationsByGenderReportLastMonthData = reservationsByGenderReportLastMonth.map( function(x, i){
      return { "label": getGenderNameById(x.genderId), "data": x.amount }
    }.bind(this));
  }

  var reservationsByAgeReportLastMonthData = [];
  if(reservationsByAgeReportLastMonth != undefined){
    reservationsByAgeReportLastMonthData = reservationsByAgeReportLastMonth.map( function(x, i){
      return { "label": x.age, "data": x.amount }
    }.bind(this));
  }


  var reservationsByZoneReportThisMonthData = [];
  if(reservationsByZoneReportThisMonth != undefined){
    reservationsByZoneReportThisMonthData = reservationsByZoneReportThisMonth.map( function(x, i){
      return { "label": getZoneNameById(x.zoneId), "data": x.amount }
    }.bind(this));
  }

  var reservationsByGenderReportThisMonthData = [];
  if(reservationsByGenderReportThisMonth != undefined){
    reservationsByGenderReportThisMonthData = reservationsByGenderReportThisMonth.map( function(x, i){
      return { "label": getGenderNameById(x.genderId), "data": x.amount }
    }.bind(this));
  }

  var reservationsByAgeReportThisMonthData = [];
  if(reservationsByAgeReportThisMonth != undefined){
    reservationsByAgeReportThisMonthData = reservationsByAgeReportThisMonth.map( function(x, i){
      return { "label": x.age, "data": x.amount }
    }.bind(this));
  }



  var usersByZoneReportLastMonthData = [];
  if(usersByZoneReportLastMonth != undefined){
    usersByZoneReportLastMonthData = usersByZoneReportLastMonth.map( function(x, i){
      return { "label": getZoneNameById(x.zoneId), "data": x.amount }
    }.bind(this));
  }

  var usersByGenderReportLastMonthData = [];
  if(usersByGenderReportLastMonth != undefined){
    usersByGenderReportLastMonthData = usersByGenderReportLastMonth.map( function(x, i){
      return { "label": getGenderNameById(x.genderId), "data": x.amount }
    }.bind(this));
  }

  var usersByAgeReportLastMonthData = [];
  if(usersByAgeReportLastMonth != undefined){
    usersByAgeReportLastMonthData = usersByAgeReportLastMonth.map( function(x, i){
      return { "label": x.age, "data": x.amount }
    }.bind(this));
  }


  var usersByZoneReportThisMonthData = [];
  if(usersByZoneReportThisMonth != undefined){
    usersByZoneReportThisMonthData = usersByZoneReportThisMonth.map( function(x, i){
      return { "label": getZoneNameById(x.zoneId), "data": x.amount }
    }.bind(this));
  }

  var usersByGenderReportThisMonthData = [];
  if(usersByGenderReportThisMonth != undefined){
    usersByGenderReportThisMonthData = usersByGenderReportThisMonth.map( function(x, i){
      return { "label": getGenderNameById(x.genderId), "data": x.amount }
    }.bind(this));
  }

  var usersByAgeReportThisMonthData = [];
  if(usersByAgeReportThisMonth != undefined){
    usersByAgeReportThisMonthData = usersByAgeReportThisMonth.map( function(x, i){
      return { "label": x.age, "data": x.amount }
    }.bind(this));
  }

  // ############### CHARTS OPTIONS ###############
  const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }));
  // ##########################################################
  // init the module
  HighchartsExporting(Highcharts);
  noDataDisplay(Highcharts);

  const dt = new Date();
  // Set global default options for all charts
  Highcharts.setOptions({
    exporting: {
      //Change URL to our own server
      // url: 'https://export.highcharts.com/',
      fallbackToExportServer: false, // Ensure the export happens on the client side or not at all
      filename: `${formatMessage(messages.listTitle).replaceAll(" ","-").toLowerCase()}-${
        dt.getFullYear().toString().padStart(4, '0')}${
        (dt.getMonth()+1).toString().padStart(2, '0')}${
        dt.getDate().toString().padStart(2, '0')}`,
    },
    lang: {
      noData: formatMessage(messages.noData)
    }
  });

  function exportPDF(graphsToExport) {
    var chartsOrdered = Highcharts.charts.sort((a, b) => (a.options.order > b.options.order) ? 1 : -1)
    
    var unit = "pt",
    size = "A4", // Use A1, A2, A3 or A4
    orientation = "portrait", // portrait or landscape
    dt = new Date(),
    marginLeft = 40,
    doc = new jsPDF(orientation, unit, size),
    pageHeight = doc.internal.pageSize.getHeight(),
    ajaxCalls = [],
    promises = [],
    yDocPos = 0,
    k = 0,
    chart,
    imgUrl,
    i,
    j;

    var options = {
      type: 'image/png'
    };

    // Merge the options
    options = Highcharts.merge(Highcharts.getOptions().exporting, options);

    graphsToExport.forEach(x => {
      chart = chartsOrdered[x];
      chart.options.title.text = chart.options.exporting.chartOptions.title.text;
    
      ajaxCalls.push($.ajax({
        type: 'post',
        url: options.url,
        data: {
          filename: options.filename || 'chart',
          type: options.type,
          // width: options.width,
          svg: chart.getSVG(),
          async: true
        }
        }));
    });

    $.when.apply(null, ajaxCalls).done(function() {

      for (j = 0; j < arguments.length; j++) {
        imgUrl = options.url + arguments[j][0];
        promises[j] = toDataURL(imgUrl);
      }

      Promise.all(promises).then((values) => {
        var title = formatMessage(messages.listTitle);
        doc.setFontSize(15);
        doc.text(title, marginLeft, 100);

        values.forEach((value, index) => {


          var page = doc.internal.getCurrentPageInfo();
          if (yDocPos > pageHeight - 380) {
            doc.addPage();
            yDocPos = 130;
            k = 0;
          } else {
            yDocPos = 130 + k * 340;
          }

          doc.addImage(value, 'PNG', 70, yDocPos);

          k++;
        });
        
        addHeaders(title, doc, marginLeft);
        addFooters(doc, dt);

        doc.save(`${formatMessage(messages.listTitle).replaceAll(" ","-").toLowerCase()}-${
          dt.getFullYear().toString().padStart(4, '0')}${
          (dt.getMonth()+1).toString().padStart(2, '0')}${
          dt.getDate().toString().padStart(2, '0')}`);
      });
    });
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

  var orderToExport = 0;

  return (
    <>
      <ContentWrapper>
        <PageHeader
          title={formatMessage(messages.listTitle)}
          // buttons={buttons}
        />
        <Card className="card-default">
          <CardBody style={{ overflowX: 'scroll' }}>
            <h3>{formatMessage(messages.orders)}</h3>
            <Button
              style={{padding: 0}}
              color="link"
              onClick={() => exportPDF([0, 1, 2, 3, 4, 5])}
              color={'link'}
            >
              {formatMessage(globalMessages.downloadPDF)}
            </Button>
            <h4>{getLastMonthName()}</h4>
            {/* START row */}
            <Row style={{ minWidth: '120rem' }}>
              <Col md={4}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard 
                      order={orderToExport++}
                      title={formatMessage(messages.zone)}
                      titleExport={`${formatMessage(messages.orders)}: ${getLastMonthName()} - ${formatMessage(messages.zone)}`}
                      highcharts={Highcharts}
                      data={ordersByZoneReportLastMonthData}
                      loading={loadingOrdersByZoneReportLastMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard 
                      order={orderToExport++}
                      title={formatMessage(messages.gender)}
                      titleExport={`${formatMessage(messages.orders)}: ${getLastMonthName()} - ${formatMessage(messages.gender)}`}
                      highcharts={Highcharts}
                      data={ordersByGenderReportLastMonthData}
                      loading={loadingOrdersByZoneReportLastMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.age)}
                      titleExport={`${formatMessage(messages.orders)}: ${getLastMonthName()} - ${formatMessage(messages.age)}`}
                      highcharts={Highcharts}
                      data={ordersByAgeReportLastMonthData}
                      loading={loadingOrdersByAgeReportLastMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* END row */}

            <h4>{getThisMonthName()}</h4>
            {/* START row */}
            <Row style={{ minWidth: '120rem' }}>
              <Col md={4}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.zone)}
                      titleExport={`${formatMessage(messages.orders)}: ${getThisMonthName()} - ${formatMessage(messages.zone)}`}
                      highcharts={Highcharts}
                      data={ordersByZoneReportThisMonthData}
                      loading={loadingOrdersByZoneReportThisMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.gender)}
                      titleExport={`${formatMessage(messages.orders)}: ${getThisMonthName()} - ${formatMessage(messages.gender)}`}
                      highcharts={Highcharts}
                      data={ordersByGenderReportThisMonthData}
                      loading={loadingOrdersByGenderReportThisMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.age)}
                      titleExport={`${formatMessage(messages.orders)}: ${getThisMonthName()} - ${formatMessage(messages.age)}`}
                      highcharts={Highcharts}
                      data={ordersByAgeReportThisMonthData}
                      loading={loadingOrdersByAgeReportThisMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* END row */}
            
            <h3>{formatMessage(messages.reservations)}</h3>
            <Button
              style={{padding: 0}}
              color="link"
              onClick={() => exportPDF([6, 7, 8, 9, 10, 11])}
              color={'link'}
            >
              {formatMessage(globalMessages.downloadPDF)}
            </Button>
            <h4>{getLastMonthName()}</h4>
            {/* START row */}
            <Row style={{ minWidth: '120rem' }}>
              <Col md={4}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.zone)}
                      titleExport={`${formatMessage(messages.reservations)}: ${getLastMonthName()} - ${formatMessage(messages.zone)}`}
                      highcharts={Highcharts}
                      data={reservationsByZoneReportLastMonthData}
                      loading={loadingReservationsByZoneReportLastMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.gender)}
                      titleExport={`${formatMessage(messages.reservations)}: ${getLastMonthName()} - ${formatMessage(messages.gender)}`}
                      highcharts={Highcharts}
                      data={reservationsByGenderReportLastMonthData}
                      loading={loadingReservationsByGenderReportLastMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.age)}
                      titleExport={`${formatMessage(messages.reservations)}: ${getLastMonthName()} - ${formatMessage(messages.age)}`}
                      highcharts={Highcharts}
                      data={reservationsByAgeReportLastMonthData}
                      loading={loadingReservationsByAgeReportLastMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* END row */}

            <h4>{getThisMonthName()}</h4>
            {/* START row */}
            <Row style={{ minWidth: '120rem' }}>
              <Col md={4}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.zone)}
                      titleExport={`${formatMessage(messages.reservations)}: ${getThisMonthName()} - ${formatMessage(messages.zone)}`}
                      highcharts={Highcharts}
                      data={reservationsByZoneReportThisMonthData}
                      loading={loadingReservationsByZoneReportThisMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.gender)}
                      titleExport={`${formatMessage(messages.reservations)}: ${getThisMonthName()} - ${formatMessage(messages.gender)}`}
                      highcharts={Highcharts}
                      data={reservationsByGenderReportThisMonthData}
                      loading={loadingReservationsByGenderReportThisMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.age)}
                      titleExport={`${formatMessage(messages.reservations)}: ${getThisMonthName()} - ${formatMessage(messages.age)}`}
                      highcharts={Highcharts}
                      data={reservationsByAgeReportThisMonthData}
                      loading={loadingReservationsByAgeReportThisMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* END row */}

            <h3>{formatMessage(messages.newUsers)}</h3>
            <Button
              style={{padding: 0}}
              color="link"
              onClick={() => exportPDF([12, 13, 14, 15, 16, 17, 18, 19])}
              color={'link'}
            >
              {formatMessage(globalMessages.downloadPDF)}
            </Button>
            <h4>{getLastMonthName()}</h4>
            {/* START row */}
            <Row style={{ minWidth: '120rem' }}>
              <Col md={3}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.zone)}
                      titleExport={`${formatMessage(messages.newUsers)}: ${getLastMonthName()} - ${formatMessage(messages.zone)}`}
                      highcharts={Highcharts}
                      data={usersByZoneReportLastMonthData}
                      loading={loadingUsersByZoneReportLastMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.gender)}
                      titleExport={`${formatMessage(messages.newUsers)}: ${getLastMonthName()} - ${formatMessage(messages.gender)}`}
                      highcharts={Highcharts}
                      data={usersByGenderReportLastMonthData}
                      loading={loadingUsersByZoneReportLastMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.age)}
                      titleExport={`${formatMessage(messages.newUsers)}: ${getLastMonthName()} - ${formatMessage(messages.age)}`}
                      highcharts={Highcharts}
                      data={usersByAgeReportLastMonthData}
                      loading={loadingUsersByAgeReportLastMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.marketingCampaign)}
                      titleExport={`${formatMessage(messages.newUsers)}: ${getLastMonthName()} - ${formatMessage(messages.marketingCampaign)}`}
                      highcharts={Highcharts}
                      data={ChartPie.data}
                      loading={false}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* END row */}

            <h4>{getThisMonthName()}</h4>
            {/* START row */}
            <Row style={{ minWidth: '120rem' }}>
              <Col md={3}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.zone)}
                      titleExport={`${formatMessage(messages.newUsers)}: ${getThisMonthName()} - ${formatMessage(messages.zone)}`}
                      highcharts={Highcharts}
                      data={usersByZoneReportThisMonthData}
                      loading={loadingUsersByZoneReportThisMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.gender)}
                      titleExport={`${formatMessage(messages.newUsers)}: ${getThisMonthName()} - ${formatMessage(messages.gender)}`}
                      highcharts={Highcharts}
                      data={usersByGenderReportThisMonthData}
                      loading={loadingUsersByGenderReportThisMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.age)}
                      titleExport={`${formatMessage(messages.newUsers)}: ${getThisMonthName()} - ${formatMessage(messages.age)}`}
                      highcharts={Highcharts}
                      data={usersByAgeReportThisMonthData}
                      loading={loadingUsersByAgeReportThisMonth}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="card-default" style={{ minHeight: '28rem' }} >
                  <CardBody>
                    <PieChartCard
                      order={orderToExport++}
                      title={formatMessage(messages.marketingCampaign)}
                      titleExport={`${formatMessage(messages.newUsers)}: ${getThisMonthName()} - ${formatMessage(messages.marketingCampaign)}`}
                      highcharts={Highcharts}
                      data={ChartPie.data}
                      loading={false}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* END row */}
          </CardBody>
        </Card>
      </ContentWrapper>
    </>
  );
}
