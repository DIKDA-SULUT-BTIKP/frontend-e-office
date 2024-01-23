import QRCode from "react-qr-code";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Logo from "../../../assets/ic_logo.png";

const LetterDispsition = () => {
  return (
    <>
      <Document>
        <Page style={styles.page}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={Logo} />
              <View style={styles.HeaderContainer}>
                <Text style={styles.companyName}>DINAS PENDIDIKAN DAERAH</Text>
                <Text style={styles.companyAddress}>
                  Jalan Dr. Sam Ratulangi No. 35, Telp (0431) 852240, 862485,
                  863184
                </Text>
                <Text style={styles.companyAddress}>
                  Facsimile 862485, 863184 Tromol Pos 56 95002
                </Text>
                <Text style={styles.companyAddress}>JManado 95111</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>

    </>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    // Menentukan orientasi horizontal
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "center",
    borderBottomWidth: 2,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Distribute space between the logos
    width: "100%", // Take the full width available
  },
  HeaderContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center", // Distribute space between the logos
    width: "100%", // Take the full width available
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  companyAddress: {
    fontSize: 12,
    fontWeight: "light",
    color: "#000000",
    marginTop: 2,
  },
  logo: {
    width: 45,
    fontSize: 14,
    height: 60,
    paddingBottom: 4,
  },
  date: {
    fontSize: 12,
    fontWeight: "semibold",
    color: "#676767",
    paddingBottom: 6,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 28,
    marginBottom: 30,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#B4B4B4",
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
  },
  columnHeader: {
    backgroundColor: "#BDBDBD",
    fontSize: 10,
    fontWeight: "bold",
    padding: 8,
    flex: 1,
    textAlign: "center",
    borderStyle: "solid",
  },
  columnCell: {
    fontSize: 10,
    padding: 8,
    flex: 1,
    textAlign: "center",
    borderStyle: "solid",
  },
  status: {
    fontSize: 12,
    fontWeight: "medium",
    color: "#000000",
    paddingBottom: 2,
  },
});

export default LetterDispsition;
