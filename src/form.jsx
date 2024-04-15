import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import "./Form.css";

function FormToPDF() {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({ name: "", option: "" });

    function handleSelectEvent(e) {
        if (e.target.id === "name") {
            setFormData({ ...formData, name: e.target.value });
        } else if (e.target.id === "course") {
            setFormData({ ...formData, option: e.target.value });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsVisible(true);
    }

    function MyDocument() {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>Name: {formData.name}</Text>
                        <Text>Course: {formData.option}</Text>
                    </View>
                </Page>
            </Document>
        );
    }

    return (
        <>
            <form action="" className='form' onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id='name' className='box' value={formData.name} placeholder='Enter Your name' onChange={handleSelectEvent} />
                <label htmlFor="course">Courses:</label>
                <select name="" id="course" value={formData.option} onChange={handleSelectEvent} className='box'>
                    <option value="">Select Courses</option>
                    <option value="b-tech">Btech</option>
                    <option value="m-tech">Mtech</option>
                </select>
                <button>Submit</button>
            </form>

            {isVisible ? 
                <div style={{ height: '100vh' }}>
                    <PDFViewer width="100%" height="100%">
                        <MyDocument />
                    </PDFViewer>
                </div>
                : null}
        </>
    );
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

export default FormToPDF;
