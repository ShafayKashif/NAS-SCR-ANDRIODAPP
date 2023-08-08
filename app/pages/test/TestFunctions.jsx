import React, { useState } from 'react';
import {addRecord, deleteRecord, updateRecord, getRecords, getRecordById} from '../../global/firebaseFunctions'
import { View, Text, Button } from 'react-native';

const handleAddRecord = () => {
  const collectionName = 'usersApp';
  const newRecordData = {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    city: 'New York',
  };
  const recordId = 'user123';

  // Call the addRecord function with the provided data.
  addRecord(collectionName, newRecordData);
};

const handleDeleteRecord = () => {
  const recordId = 'user123';

  // Call the addRecord function with the provided data.
  deleteRecord('usersApp', recordId);
}

const handleUpdateRecord = () => {
  const newRecordData = {
    name: 'John Doe',
    age: 232
  };
  const recordId = 'user123';

  // Call the addRecord function with the provided data.
  updateRecord('usersApp', recordId, newRecordData);
}

function handleGetAllRecords(){
  const collectionName = 'usersApp';
  getRecords(collectionName).then(records => {
    console.log(records);
  });
}

function handleGetOneRecord(){
  const recordId = 'user123'; 
  const collectionName = 'usersApp';
  getRecordById(collectionName, recordId).then(record => {
    console.log(record);
  });
}

function TestFunctions() {
  return (
<View>
    <Button title="Add Record" onPress={handleAddRecord} />
    <Button title="Update Record" onPress={handleUpdateRecord} />
    <Button title="Delete Record" onPress={handleDeleteRecord} />
    <Button title="Get Records" onPress={handleGetAllRecords} />
    <Button title="Get Single Record" onPress={handleGetOneRecord} />
  </View>
  );
}

export default TestFunctions;