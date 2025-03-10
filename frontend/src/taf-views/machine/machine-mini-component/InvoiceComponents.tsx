import React, {Fragment} from "react";
import { View, Image, Text } from "@react-pdf/renderer";
import {styles} from '../../../constants/style'
import logo from '../../../assets/images/taf-logo.png'
import { MachineAPIResponse } from "../../../interface/machine-interface";
import {format} from 'date-fns'
import { useGetSalesInformationQuery } from "../../../services/salesAPI";
// import { SalesAPIInformationInterface } from "../../../interface/sales-interface";

const reciept_data = {
    "id": "642be0b4bbe5d71a5341dfb1",
    "invoice_no": "20200669",
    "address": "739 Porter Avenue, Cade, Missouri, 1134",
    "date": "24-09-2019",
    "items": [
      {
        "id": 1,
        "desc": "do ex anim quis velit excepteur non",
        "qty": 8,
        "price": 179.25
      },
      {
        "id": 2,
        "desc": "incididunt cillum fugiat aliqua Lorem sit Lorem",
        "qty": 9,
        "price": 107.78
      },
      {
        "id": 3,
        "desc": "quis Lorem ad laboris proident aliqua laborum",
        "qty": 4,
        "price": 181.62
      },
      {
        "id": 4,
        "desc": "exercitation non do eu ea ullamco cillum",
        "qty": 4,
        "price": 604.55
      },
      {
        "id": 5,
        "desc": "ea nisi non excepteur irure Lorem voluptate",
        "qty": 6,
        "price": 687.08
      }
    ]
  }

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

export const Address = ({rowData}: InvoiceComponentsINterface) => (
    <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
            <View style={{ gap: 7}}>
                <Text style={styles.report}>Daily Sales Report </Text>
                <View style={styles.flexDisplay}>
                    <Text style={[styles.reportNumber, {fontFamily: 'Poppins', fontWeight: 'bold', fontSize: 9}]}>Report ID - </Text>
                    <Text style={[styles.reportNumber, {textDecoration: 'underline'}]}>#090454{rowData?.sales_in_money}</Text>

                </View>
            </View>
            <View style={[styles.flexDisplay, {alignItems: 'flex-end'}]}>
                <Text style={styles.reportNumber}>Date </Text>
                <Text style={[styles.title, {textDecoration: 'underline'}]}>{format(new Date(), 'dd-MMMM-yyyy')}</Text>
                
            </View>

        </View>
    </View>
);



export const TableHead = () => (
    <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
        <View style={[styles.theader, styles.theader2, {color: "green"}]}>
            <Text style={{color: 'green'}}>Items</Text>   
        </View>
        <View style={styles.theader}>
            <Text>Price</Text>   
        </View>
        <View style={styles.theader}>
            <Text>Qty</Text>   
        </View>
        <View style={styles.theader}>
            <Text>Amount</Text>   
        </View>
    </View>
);

export const TableBody = () => {
    

    return(
        <>
        {

            reciept_data.items.map((receipt)=>(
             <Fragment key={receipt.id}>
                 <View style={{ width:'100%', flexDirection :'row'}}>
                     <View style={[styles.tbody, styles.tbody2]}>
                         <Text >{receipt.desc}</Text>   
                     </View>
                     <View style={styles.tbody}>
                         <Text>{receipt.price} </Text>   
                     </View>
                     <View style={styles.tbody}>
                         <Text>{receipt.qty}</Text>   
                     </View>
                     <View style={styles.tbody}>
                         <Text>{(receipt.price * receipt.qty).toFixed(2)}</Text>   
                     </View>
                 </View>
             </Fragment>
            ))
        }

        
        </>
    )
}

    


 export const TableTotal = () => (
    <View style={{ width:'100%', flexDirection :'row'}}>
        <View style={styles.total}>
            <Text></Text>   
        </View>
        <View style={styles.total}>
            <Text> </Text>   
        </View>
        <View style={styles.tbody}>
            <Text>Total</Text>   
        </View>
        <View style={styles.tbody}>
            <Text>
                {reciept_data.items.reduce((sum, item)=> sum + (item.price * item.qty), 0)}
            </Text>  
        </View>
    </View>
);

interface InvoiceComponentsINterface {
    rowData: MachineAPIResponse | undefined 
}

const InvoiceComponents = ({rowData}: InvoiceComponentsINterface) => {
  return (
    <div>
           <ReportHeader  />
            <Address rowData={rowData} />
            <TableHead/>
            <TableBody/>
            <TableTotal/>
    </div>
  )
}

export default InvoiceComponents

