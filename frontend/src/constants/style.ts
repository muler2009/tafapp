import {StyleSheet, Font} from "@react-pdf/renderer"



Font.register({ family: 'Poppins', src: "/Poppins/Poppins-Regular.ttf" });

export const styles = StyleSheet.create({
    page: {fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column' },

    spaceBetween : {flexGrow: 1, flexDirection: 'row',alignItems:'center',justifyContent:'space-between',color: "#3E3E3E" },
    spaceColumn : {flexDirection: 'column',alignItems: 'flex-start', justifyContent:'flex-start',color: "#3E3E3E" },
    flexDisplay : {display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'},


    titleContainer: {flexDirection: 'row',marginTop: 15},
    
    logo: { width: 70 },

    report: {  fontSize: 12,  textAlign: 'center', fontWeight: 'bold', fontFamily: 'Poppins', color: 'green' },
    reportTitle: {  fontSize: 22,  textAlign: 'center', fontWeight: 'bold' },


    title : {fontSize: 9, fontFamily: 'Poppins', paddingTop: 0}, 
    
    invoice : {fontWeight: 'bold',fontSize: 15},
    
    reportNumber : {fontSize: 11,fontWeight: 'bold'}, 
    
    address : { fontWeight: 400, fontSize: 10},

    theader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "#f3f3f3",
        padding: 5,
        fontWeight: "bold",
        borderBottom: "1px solid #000",
        marginTop: 20
      },

    
    theader1 : {marginTop : 20, zIndex: -10, fontSize : 10 ,paddingTop: 4 ,paddingLeft: 7 ,flex:1, height:20, backgroundColor: '#DEDEDE', borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},

    theader2 : { flex:2, borderRightWidth:0, borderBottomWidth:1},

    tbody:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},

    total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},

    tbody2:{ flex:2, borderRightWidth:1, }
    
});

export const tableStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: "Helvetica",
    paddingLeft: 40,
    paddingRight: 40
  },
  watermark : {
    position: "absolute",
    top: "40%",
    left: "25%",
    fontSize: 50,
    color: 'rgba(200, 200, 200, 0.3)',
    transform: 'rotate(-30deg)',
    zIndex: -10,
  },
  logo: { width: 50 },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingTop: 25,
    borderBottom: "1px dashed black"
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
  },
  spaceY: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  billTo: {
    marginBottom: 10,
  },
  table: { width: "100%", borderColor: "#000", border: "1px solid black" },
  tableRow: { flexDirection: "row", justifyContent: "flex-start",},
  tableHeader: { backgroundColor: "#f2f2f2", fontWeight: "bold", justifyContent: "flex-start", paddingBottom: 3, paddingTop: 3 },
  tableHead: { flex: 1, borderBottom: "1px solid #000", borderColor: "#000", padding: 5, textAlign: "left", fontFamily: "Poppins", fontSize: 9 },
  colNo: { width: "3%", textAlign: "left" }, // "No" Column
  colMachine: { width: "30%", textAlign: "left" },
  colUnitPrice: { width: "20%", textAlign: "left"},
  colSoldQty: { width: "20%", textAlign: "left"},
  colAmount: { width: "20%", textAlign: "left"},
  tableCell: {
    flex: 1,
    borderBottom: "1px solid #000",
    borderColor: "#000",
    padding: 5,
    textAlign: "left",
    fontFamily: "Poppins"
  },
  tbody:{ fontSize : 9, paddingTop: 4 , paddingBottom: 4,  paddingLeft: 7 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},
  footer: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    textAlign: "center",
    fontSize: 10,
    color: "gray",
  },
  footerLine: {
    borderTop: "1px solid gray", // Adds a footer line
    width: "100%",
    marginBottom: 5,
  },
  totals: {
    display: "flex",
    alignItems: "flex-end",
  },
});