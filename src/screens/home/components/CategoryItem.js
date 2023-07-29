import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import TextBox from "../../../components/TextBox";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, dimensions } from "../../../res/appStyles";
import { addZeroes } from "../../../utils/funcations";
import { SIGN } from "../../../res/ConstVariable";
 
class CategoryItem extends React.Component {
  state = {
    visiableChild: true,
    itemList:[]
  };
  onChangeView = () => {
    const { visiableChild } = this.state;
    this.setState({ visiableChild: !visiableChild });
  };
  componentDidMount() {
    const { type = {} } = this.props;
    const items =type['childs']
    let itemList=[]
     for(key in items) {
       if(items.hasOwnProperty(key)) {
        var item = items[key];
       
       const data={
           name:item.name,
           rate:item.amount,
           count:item.count
       }
       itemList.push(data)
      }
      this.setState({itemList})
  }
  }
  render() {
    const { visiableChild ,itemList} = this.state;
    const { type = {} } = this.props;
 
    return (
      <View key={type.title} style={styles.clothTypes}>
        <TouchableOpacity
          onPress={() => this.onChangeView()}
          style={styles.typeTitle}
        ><Ionicons
            style={{ marginRight: 10 }}
            size={20}
            color={"#7E7E7E"}
            name={
              visiableChild
                ? "md-remove-circle-outline"
                : "md-add-circle-outline"
            }
          />
          <TextBox type="body2">{type.title}</TextBox>
        </TouchableOpacity>
        {
          visiableChild? (
                      <View style={[styles.cloths, { paddingVertical: 0 }]}>
                        <TextBox style={{ width: "40%" }} />
                        <TextBox
                          style={[styles.cloth, { fontSize: 13 }]}
                          type="caption1"
                        >
                          Unit Price
                        </TextBox>
                        <TextBox
                          style={[styles.cloth, { fontSize: 13 }]}
                          type="caption2"
                        >
                          Total Price
                        </TextBox>
                      </View>
                    ) : null}

        { visiableChild? itemList.map(item=>(<View style={[
                          styles.cloths,
                          {
                            marginBottom:0
                             // index + 1 == type.cloths.length ? 20 : 0
                          }
                        ]}
                      >
                        <TextBox
                          style={{ width: "40%", fontWeight: "normal" }}
                          type="caption2"
                        >{`${item.count} X ${item.name}`}</TextBox>
                        <TextBox
                          style={[styles.cloth, { fontWeight: "normal" }]}
                          type="caption2"
                        >
                         {SIGN}{addZeroes(item.rate)}
                        </TextBox>
                        <TextBox
                          style={[styles.cloth, { fontWeight: "normal" }]}
                          type="caption2"
                        >
                          {SIGN}{addZeroes(item.rate * item.count)}
                        </TextBox>
                    </View>
          )):null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  typeTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 5
  },

  cloths: {
    paddingLeft: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5
  },

  cloth: {
    width: "30%",
    textAlign: "center"
  }
});
export default CategoryItem;
