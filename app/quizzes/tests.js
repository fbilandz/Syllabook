import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert, Dimensions } from 'react-native';
import { CheckBox, Text as Txt, Button, Icon } from 'react-native-elements';

export class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    question: "Tko je tko?",
                    answers: ["Mi", "Vi", "Oni", "One"],
                    correctAns: 2,
                },
                {
                    question: "Tko je tko?",
                    answers: ["Mi", "Ja", "Oni", "One"],
                    correctAns: 1,
                }
            ],
            index: 0,
            checked: [false, false, false, false],
            correct: 0,
        }
        this.repeat = this.repeat.bind(this)
    }
    checkUp = (i) => {
        console.log(i)
        let checked = [false, false, false, false]
        checked[i] = true;
        this.setState({
            checked: checked
        })
        console.log(this.state.checked)
    }
    nextQuest() {
        const { data, index, checked } = this.state;
        var i = 0;
        for (; i < 4; i++) {
            if (checked[i] === true) break;
        }
        if (i == 4) {
            Alert.alert("No answer", "You must check an answer")
        }
        else {
            if (data[index].correctAns === i) {
                this.setState({
                    correct: this.state.correct + 1,
                })
            }
            this.setState({
                index: this.state.index + 1,
                checked: [false, false, false, false]

            })
        }
    }
    repeat() {
        this.setState({
            index: 0,
            correct: 0,
            checked: [false, false, false, false]
        })
    }
    render() {
        const { data, index } = this.state;
        console.log(data.length)
        if (data.length > index) {
            return (
                <View style={styles.questView}>
                    <Txt h2>{data[index].question}</Txt>
                    <CheckBox
                        center
                        containerStyle={styles.answers}
                        title={data[index].answers[0]}
                        iconRight
                        checked={this.state.checked[0]}
                        onPress={() => this.checkUp(0)}
                    />
                    <CheckBox
                        center
                        containerStyle={styles.answers}
                        title={data[index].answers[1]}
                        iconRight
                        checked={this.state.checked[1]}
                        onPress={() => this.checkUp(1)}
                    />
                    <CheckBox
                        center
                        title={data[index].answers[2]}
                        iconRight
                        checked={this.state.checked[2]}
                        onPress={() => this.checkUp(2)}
                        containerStyle={styles.answers}
                    />
                    <CheckBox
                        center
                        title={data[index].answers[3]}
                        containerStyle={styles.answers}
                        iconRight
                        checked={this.state.checked[3]}
                        onPress={() => this.checkUp(3)}
                    />
                    <Button
                        title="Next question"
                        onPress={() => this.nextQuest()}
                        backgroundColor="green"
                        containerViewStyle={styles.button}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.questView}>
                    <Text>You scored {this.state.correct} of {data.length} ({this.state.correct / data.length * 100}%)</Text>
                    <Button
                        raised
                        icon={{ name: 'cached' }}
                        backgroundColor="green"
                        containerViewStyle={styles.button}
                        title='Repeat'
                        onPress={this.repeat}
                    />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    questView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    answers: {
        minWidth: Dimensions.get("screen").width * 0.8,
        paddingVertical: 10,
        marginVertical: 10
    },
    button: {
        width: Dimensions.get("screen").width * 0.78,
        marginTop: 15
    }
})