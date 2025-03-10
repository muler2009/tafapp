import StyleSheet from "styled-components/dist/sheet";
import { View, Image, Text } from "@react-pdf/renderer";
import { styles, tableStyles } from "../../../../constants/style";
import logo from '../../../../assets/images/taf-logo.png'
import {format} from 'date-fns'
import { SalesAPIResponse } from "../../../../interface/sales-interface";
import { Fragment } from "react";

export const ReportHeader = () => (
    <View style={[styles.titleContainer, {borderBottom: '3px double black', paddingBottom: 2}]}>
        <View style={styles.spaceBetween}>
            <View style={styles.flexDisplay}>
                <Image style={styles.logo} src={logo} />
                <View style={[styles.spaceColumn, {gap: 7}]}>
                    <Text style={styles.reportTitle}>TAF</Text>
                    <Text style={[{fontFamily: 'Poppins', fontWeight: 'bold', fontSize: 9, maxWidth: '100%',  textOverflow: 'ellipsis'}]}>Oil Ethiopia</Text>
                </View>
            </View>
        </View>
    </View>
);

export const SalesReportTitle = () => (
    <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
            <View style={[styles.flexDisplay, {justifyContent: "flex-end"}]}>
                <Text style={styles.report}>Daily Sales Report </Text>        
            </View>
            <View style={[styles.flexDisplay, {alignItems: 'flex-end'}]}>
                <Text style={styles.reportNumber}>Date </Text>
                <Text style={[styles.title, {fontWeight: 'bold'}]}>{format(new Date(), 'dd-MMMM-yyyy')}</Text>
                
            </View>

        </View>
    </View>
);


// export const TableHead = () => (
//     <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
//       <View style={styles.theader}>
//         <View>
//             <Text style={{color: 'green'}}>Machine</Text>   
//         </View>
//         <View>
//             <Text>Unit Price</Text>   
//         </View>
//         <View>
//             <Text>Sold Qty</Text>   
//         </View>
//         <View>
//             <Text>Amount</Text>   
//         </View>

//       </View>
//     </View>
// );

export const TableHead = () => (
    <View style={[styles.theader]}>
        <View>
            <Text style={{flex: 1}}>Machine</Text>

        </View>

      <Text >Unit Price</Text>
      <Text >Sold Qty</Text>
      <Text >Amount</Text>
    </View>
  );
    

export const TableBody = ({salesData}: {salesData: SalesAPIResponse[]}) => 
    {
        return(
            <>
                {
                    salesData?.map((sales)=>(
                    <Fragment key={sales.sales_id}>
                        <View style={{ width:'100%', flexDirection :'row'}}>
                            <View style={[styles.tbody, styles.tbody2]}>
                                <Text >{sales.machine}</Text>   
                            </View>
                            <View style={styles.tbody}>
                                <Text>{sales.unit_price} </Text>   
                            </View>
                            <View style={styles.tbody}>
                                <Text>{sales.sold_qty}</Text>   
                            </View>
                            <View style={styles.tbody}>
                                <Text>{(sales.unit_price * sales.sold_qty).toFixed(2)}</Text>   
                            </View>
                        </View>
                    </Fragment>
                    ))
                }
    
            
            </>
        )
}


export const PDFHeader = () => {
    return(
        <>
        <View style={tableStyles.header}>
          <View>
            <Text style={[tableStyles.title, tableStyles.textBold]}>SALES REPORTS</Text>
            <Text>Month #INV-2024-001</Text>
          </View>
          <View style={tableStyles.spaceY}>
            <View style={styles.flexDisplay}>
                <Image style={styles.logo} src={logo} />
                <View style={tableStyles.spaceY}>
                    <Text style={styles.reportTitle}>TAF</Text>
                    <Text style={[{fontFamily: 'Poppins', fontWeight: 'bold', fontSize: 9, maxWidth: '100%',  textOverflow: 'ellipsis'}]}>Oil Ethiopia</Text>
                </View>
            </View>
            <Text>City, Addis Ababa</Text>
          </View>
        </View>

        {/* <View style={tableStyles.spaceY}>
          <Text style={[tableStyles.billTo, tableStyles.textBold]}>Bill To:</Text>
          <Text>Gen</Text>
          <Text>Client Address</Text>
          <Text>City, State ZIP</Text>
        </View> */}
        
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
        <View style={tableStyles.table}>
             {/* Table Header */}
            <View style={[tableStyles.tableRow, tableStyles.tableHeader]}>
                <Text style={[tableStyles.tableHead, tableStyles.colNo, tableStyles.textBold]}>No</Text>
                <Text style={[tableStyles.tableHead, tableStyles.textBold]}>Machine Name</Text>
                <Text style={[tableStyles.tableHead, tableStyles.textBold]}>Unit Price</Text>
                <Text style={[tableStyles.tableHead, tableStyles.textBold]}>Sold Qty</Text>
                <Text style={[tableStyles.tableHead, tableStyles.textBold]}>Amount</Text>
            </View>

            {/* Table Body */}
            {
                salesData.map((item, index) => (
                    <View key={item.sales_id} style={tableStyles.tableRow}>
                        <Text style={tableStyles.colNo}>{index + 1}</Text>
                        <Text style={[tableStyles.tbody, ]}>{item.machine}</Text>
                        <Text style={[tableStyles.tbody, ]}>{item.unit_price}</Text>
                        <Text style={[tableStyles.tbody, ]}>{item.sold_qty}</Text>
                        <Text style={[tableStyles.tbody, ]}>{(item.unit_price * item.sold_qty).toFixed(2)}</Text>
                    </View>
                ))
            }
      </View>
    )
}
  


