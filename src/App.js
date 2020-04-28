import React from 'react';
import MainGrid from './mainGrid';
import CustomizedSelects from  './selector';
import './App.css';

function App() {
  const [type, setType] = React.useState('accumulation')
  const [syncUrl, setSyncUrl] = React.useState('http://localhost:8000/sync/accumulation')

  React.useEffect(() => {
    setSyncUrl('http://localhost:8000/sync/' + type)
    console.log(syncUrl)
  }, [type])
  return (
    // <MyResponsivePie/>
    <div>
      <CustomizedSelects type={type} setType={setType}/>
      <MainGrid syncUrl={syncUrl}/>
    </div>
  );
}

export default App;
