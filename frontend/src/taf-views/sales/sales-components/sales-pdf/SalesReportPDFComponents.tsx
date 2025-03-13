import StyleSheet from "styled-components/dist/sheet";
import { View, Image, Text } from "@react-pdf/renderer";
import { styles, tableStyles } from "../../../../constants/style";
import logo from '../../../../assets/images/taf-logo.png'
import {format} from 'date-fns'
import { SalesAPIResponse } from "../../../../interface/sales-interface";
import { Fragment } from "react";

  



export const PDFHeader = ({month, year}: any) => {
    const month_report = new Date(month + 1).toLocaleString("en-US", {month: "long"})
    console.log(month)
    return(
        <>
            <View style={tableStyles.header}>
                <View style={tableStyles.spaceY}>
                    <Text style={[tableStyles.title, tableStyles.textBold]}>TAF Oil Ethiopia</Text>
                    <Text style={{fontFamily: "Poppins", fontSize: 9}}>Addis Ababa Ethiopia</Text>
                    <Text style={{fontFamily: "Poppins", fontSize: 9}}>+251913158556</Text>
                </View>
                
                <Image style={tableStyles.logo} src={logo} />
                
            </View>
            <View style={{marginTop: 30, display: "flex", justifyContent: "flex-end"}} >
                <Text>{format(new Date(), "MMMM, dd yyyy")}</Text>
            </View>
            <View style={{marginTop: 30}}>
                <Text style={[tableStyles.title, tableStyles.textBold]}>SALES REPORTS</Text>
            </View>
        </>

    )
}

export const PDFFooter = () => {
    return(
        <View style={tableStyles.footer}>
            <View style={tableStyles.footerLine}/>
            <Text>© {new Date().getFullYear()} taf. All rights reserved.</Text>
        </View>
    )
}

export const PDFTableComponent = ({salesData}: {salesData: SalesAPIResponse[]}) => {
    return(
        <View style={{marginTop: 20}}>
            <View style={tableStyles.table}>
                {/* Table Header */}
                <View style={[tableStyles.tableRow, tableStyles.tableHeader]}>
                    <Text style={[tableStyles.tableHead, tableStyles.colNo, tableStyles.textBold, {flex: 0.2}]}>No</Text>
                    <Text style={[tableStyles.tableHead, tableStyles.textBold]}>Machine Name</Text>
                    <Text style={[tableStyles.tableHead, tableStyles.textBold]}>Unit Price</Text>
                    <Text style={[tableStyles.tableHead, tableStyles.textBold]}>Monthly Sold Qty</Text>
                    <Text style={[tableStyles.tableHead, tableStyles.textBold]}>Sales (ETB)</Text>
                </View>
                <View>
                    {/* Table Body */}
                    {
                        salesData.map((item, index) => (
                            <View key={item.sales_id} style={tableStyles.tableRow}>
                                <Text style={[tableStyles.colNo, tableStyles.tbody, {textAlign: "center", flex: 0.2}]}>{index + 1}</Text>
                                <Text style={[tableStyles.tbody, ]}>{item.machine}</Text>
                                <Text style={[tableStyles.tbody, ]}>{item.unit_price}</Text>
                                <Text style={[tableStyles.tbody, ]}>{item.total_sold_qty}</Text>
                                <Text style={[tableStyles.tbody, ]}>{item.total_sales}</Text>
                            </View>
                        ))
                    }
                </View>
                {/* Total Sales Row */}
            </View>

            <View style={[tableStyles.tableRow, { marginTop: 5}]}>
                <Text style={{ flex: 3, textAlign: "right", fontWeight: "bold", paddingTop: 4 , paddingBottom: 4 }}>
                    Total Sales:
                </Text>
                <Text style={[tableStyles.tbody, { flex: 0.8, marginLeft: 5,  fontWeight: "bold" }]}>
                    {salesData?.reduce((sum, item) => sum + Number(item.total_sales), 0)}
                </Text>
            </View>

        </View>
    )
}


  




