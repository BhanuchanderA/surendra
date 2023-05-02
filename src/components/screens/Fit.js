import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const Fit = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastYear = currentYear - 100;
    const [selectedDates, setSelectedDates] = useState([]);

    const months = [
        { name: 'January', days: 31 },
        { name: 'February', days: currentYear % 4 === 0 ? 29 : 28 },
        { name: 'March', days: 31 },
        { name: 'April', days: 30 },
        { name: 'May', days: 31 },
        { name: 'June', days: 30 },
        { name: 'July', days: 31 },
        { name: 'August', days: 31 },
        { name: 'September', days: 30 },
        { name: 'October', days: 31 },
        { name: 'November', days: 30 },
        { name: 'December', days: 31 },
    ];

    const getDaysArray = (month, year) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    const handleDatePress = (day, monthIndex) => {
        const selectedDate = new Date(currentYear, monthIndex, day);
        if (selectedDates.find(date => date.getTime() === selectedDate.getTime())) {
            // Date already selected, so remove it from the array
            setSelectedDates(selectedDates.filter(date => date.getTime() !== selectedDate.getTime()));
        } else {
            // Date not selected yet, so add it to the array
            setSelectedDates([...selectedDates, selectedDate].sort((a, b) => a.getTime() - b.getTime()));
        }
    };

    const isDateSelected = (day, monthIndex) => {
        const selectedDate = new Date(currentYear, monthIndex, day);
        return selectedDates.find(date => date.getTime() === selectedDate.getTime());
    };

    const generateCalendars = () => {
        const calendars = [];
        for (let year = currentYear; year >= lastYear; year--) {
            calendars.push(
                <View key={year}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>{year}</Text>
                    {months.map((month, index) => (
                        <React.Fragment key={index}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>{month.name}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {getDaysArray(index + 1, year).map((day, i) => (
                                    <Text
                                        key={i}
                                        onPress={() => handleDatePress(day, index)}
                                        style={{
                                            padding: 10,
                                            width: '14%',
                                            textAlign: 'center',
                                            backgroundColor: isDateSelected(day, index) ? '#F472B6' : '#F2F2F2',
                                            margin: '0.5%',
                                            borderRadius: 5,
                                            color: isDateSelected(day, index) ? '#FFFFFF' : '#000000',
                                        }}>
                                        {day}
                                    </Text>
                                ))}
                            </View>
                        </React.Fragment>
                    ))}
                </View>
            );
        }
        return calendars;
    };

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                {generateCalendars()}
                <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>Selected Dates:</Text>
                <Text style={{ padding: 10 }}>{startDate ? startDate.toDateString() : '-'}</Text>
                <Text style={{ padding: 10 }}>{endDate ? endDate.toDateString() : '-'}</Text>
            </View>
        </ScrollView>
    );
};

export default Fit;