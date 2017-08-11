import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Alert } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
//var ProgressBar =  require('react-native-progress-bar');


export class AddATest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            testName: "",
            started: false,
            index: 0,
            question: "",
            answers0: "",
            answers1: "",
            answers2: "",
            answers3: "",
            correctAns: 4,
            checked: [false, false, false, false]
        }
        this.nextQuest = this.nextQuest.bind(this);
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
        //const { checked } = this.state;
        console.log(this.state.checked)
        var i = 0;
        for (; i < 4; i++) {
            if (this.state.checked[i] === true) break;
        }
        if (i == 4) {
            Alert.alert("No answer checked", "You must check a correct answer")
        } else {
            let questions = this.state.questions;
            let quest = {
                question: this.state.question,
                answers: [this.state.answers0, this.state.answers1, this.state.answers2, this.state.answers3],
                correctAns: i,
            }
            questions.push(quest);
            this.setState({
                index: this.state.index + 1,
                questions: questions,
                question: "",
                answers0: "",
                answers1: "",
                answers2: "",
                answers3: "",
                checked: [false, false, false, false],
            })
        }
    }

    render() {
        console.log(this.state.questions)
        const { started, temporary, checked } = this.state;
        if (!started) {
            return (
                <View>
                    <TextInput
                        editable
                        onChangeText={(testName) => this.setState({ testName: testName })}
                        placeholder="Quiz name"
                        placeholderTextColor="green"
                    />
                    <Button title="Add questions" backgroundColor="green" onPress={() => this.setState({ started: true })} />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <TextInput editable style={{ width: Dimensions.get("window").width * 0.8 }} placeholder="Question" onChangeText={(question) => this.setState({ question: question })} />
                    <View style={styles.check}>
                        <TextInput placeholder="Answer no. 1" style={styles.textI} editable onChangeText={(ans) => this.setState({ answers0: ans })} />
                        <CheckBox checked={checked[0]} onPress={() => this.checkUp(0)} />
                    </View>
                    <View style={styles.check}>
                        <TextInput placeholder="Answer no. 1" style={styles.textI} editable onChangeText={(ans) => this.setState({ answers1: ans })} />
                        <CheckBox checked={checked[1]} onPress={() => this.checkUp(1)} />
                    </View>
                    <View style={styles.check}>
                        <TextInput placeholder="Answer no. 1" style={styles.textI} editable onChangeText={(ans) => this.setState({ answers2: ans })} />
                        <CheckBox checked={checked[2]} onPress={() => this.checkUp(2)} />
                    </View>
                    <View style={styles.check}>
                        <TextInput placeholder="Answer no. 1" style={styles.textI} editable onChangeText={(ans) => this.setState({ answers3: ans })} />
                        <CheckBox checked={checked[3]} onPress={() => this.checkUp(3)} />
                    </View>
                    <Button title="New question" onPress={this.nextQuest} />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    check: {
        flexDirection: 'row',
        width: Dimensions.get("window").width * 0.8,
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    textI: {
        width: Dimensions.get("window").width * 0.7
    }
})