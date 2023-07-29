import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../../res/appStyles";
import { StartIcon } from "../../components/icons/starIcon";
import { StartIconFill } from "../../components/icons/starIconFill";
import TextBox from "../../components/TextBox";

export default class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <View style={styles.rating}>
          <View style={styles.reviews}>
            <TextBox type="title" style={{ fontSize: 22 }}>
              4.1
            </TextBox>
            <View style={{ flexDirection: "row" }}>
              <StartIconFill color="#ffa800" size={32} />
              <StartIconFill color="#ffa800" size={32} />
              <StartIconFill color="#ffa800" size={32} />
              <StartIconFill color="#ffa800" size={32} />
              <StartIcon color="#000000" size={32} />
            </View>
            <TextBox type="caption2" style={{}}>
              429 Review
            </TextBox>
          </View>
          <View style={styles.starRating}>
            <View style={styles.ratingRow}>
              <TextBox type="caption">5 star</TextBox>
              <View style={[styles.prgress, { paddingEnd: 50 }]}>
                <View style={styles.progressFill} />
              </View>
            </View>
          </View>
          <View style={styles.starRating}>
            <View style={styles.ratingRow}>
              <TextBox type="caption">4 star</TextBox>
              <View style={[styles.prgress, { paddingEnd: 100 }]}>
                <View style={styles.progressFill} />
              </View>
            </View>
          </View>
          <View style={styles.starRating}>
            <View style={styles.ratingRow}>
              <TextBox type="caption">3 star</TextBox>
              <View style={[styles.prgress, { paddingEnd: 170 }]}>
                <View style={styles.progressFill} />
              </View>
            </View>
          </View>
          <View style={styles.starRating}>
            <View style={styles.ratingRow}>
              <TextBox type="caption">2 star</TextBox>
              <View style={[styles.prgress, { paddingEnd: 90 }]}>
                <View style={styles.progressFill} />
              </View>
            </View>
          </View>
          <View style={styles.starRating}>
            <View style={styles.ratingRow}>
              <TextBox type="caption">1 star</TextBox>
              <View style={[styles.prgress, { paddingEnd: 150 }]}>
                <View style={styles.progressFill} />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ height: 0.5, width: "100%", backgroundColor: "#000000" }}
        />
        <View>
          <View style={styles.commentsBackground}>
            <View style={{ paddingVertical: 10 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignContent: "center",
                  marginBottom: 5
                }}
              >
                <Text style={styles.commentsTitle}>Cris Stankovic</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <StartIconFill color="#ffa800" size={24} />
                  <StartIconFill color="#ffa800" size={24} />
                  <StartIcon color="#000000" size={24} />
                  <StartIcon color="#000000" size={24} />
                  <StartIcon color="#000000" size={24} />
                </View>
              </View>

              <Text style={styles.commentText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy{" "}
              </Text>
            </View>
          </View>
          <View
            style={{ height: 0.5, width: "100%", backgroundColor: "#000000" }}
          />
          <View style={styles.commentsBackground}>
            <View style={{ paddingVertical: 10 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignContent: "center",
                  marginBottom: 5
                }}
              >
                <Text style={styles.commentsTitle}>John Doe</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <StartIconFill color="#ffa800" size={24} />
                  <StartIconFill color="#ffa800" size={24} />
                  <StartIconFill color="#ffa800" size={24} />
                  <StartIcon color="#000000" size={24} />
                  <StartIcon color="#000000" size={24} />
                </View>
              </View>
              <Text style={styles.commentText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy{" "}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rating: {
    backgroundColor: colors.lightOrangeBg,
    width: "100%",
    padding: 15
  },

  reviews: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "flex-end"
  },

  starRating: {
    paddingVertical: 8,
    width: "100%"
  },

  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  prgress: {
    height: 5,
    width: "80%",
    backgroundColor: colors.progressBg,
    borderRadius: 10
  },

  progressFill: {
    height: 5,
    backgroundColor: colors.progressFill,
    borderRadius: 10
  },

  commentsBackground: {
    backgroundColor: colors.white,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10
  },

  commentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlignVertical: "center"
  },

  commentText: {
    fontStyle: "italic"
  }
});
