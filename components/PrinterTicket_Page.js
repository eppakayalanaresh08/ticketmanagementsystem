import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';


const data = {
    "Andhra Pradesh": {
      "Anantapur": ["Anantapur", "Dharmavaram", "Gooty", "Guntakal", "Hindupur", "Kadiri", "Kakkalapalle", "Kalyandurg", "Narayanapuram", "Papampeta", "Rayadurg", "Somandepalle", "Tadpatri (Tadipatri)", "Uravakonda", "Yenumalapalle"],
      "Chittoor": ["Akkarampalle", "Avilala", "Cherlopalle", "Chittoor", "Kuppam", "Madanapalle", "Mangalam", "Mangasamudram", "Murakambattu", "Nagari", "Narayanavanam", "Palamaner", "Perur", "Pileru", "Punganur", "Puttur", "Renigunta", "Srikalahasti", "Tiruchanur", "Tirumala", "Tirupati", "Tirupati NMA"],
      "East Godavari": ["Amalapuram", "Arempudi", "Bandarulanka", "Chidiga", "Dowleswaram", "Hukumpeta", "Kakinada", "Katheru", "Mandapeta", "Morampudi", "Peddapuram", "Pithapuram", "Rajahmundry", "Ramachandrapuram", "Ramanayyapeta", "Rampachodavaram", "Samalkot", "Suryaraopeta", "Tuni"],
      "Guntur": ["Bapatla", "Chilakaluripet", "Guntur", "Macherla", "Mangalagiri", "Narasaraopet", "Piduguralla", "Ponnur", "Repalle", "Sattenapalle", "Tadepalle", "Tenali", "Vaddeswaram", "Vinukonda"],
      "Krishna": ["Gudivada", "Guntupalle", "Ibrahimpatnam", "Jaggaiahpet (Jaggayyapeta)", "Kankipadu", "Kanuru", "Kondapalle (Kondapalli)", "Machilipatnam", "Nadim Tiruvuru", "Nuzvid", "Pedana", "Poranki", "Prasadampadu", "Ramavarappadu", "Tadigadapa", "Vijayawada", "Yenamalakuduru"],
      "Kurnool": ["Adoni", "Banaganapalle (Banganapalle)", "Banumukkala", "Bethamcherla", "Dhone (Dronachalam)", "Kurnool (incl. Kallur)", "Mamidalapadu", "Nandyal", "Ramapuram", "Srisailam Project RFC Township (Right Flank Colony)", "Thummalamenta", "Yemmiganur"],
      "Prakasam": ["Chirala", "Cumbum", "Giddaluru", "Kandukur", "Kanigiri U", "Markapur", "Mulaguntapadu", "Ongole", "Pamur", "Podili", "Singarayakonda", "Vetapalem"],
      "Sri Potti Sriramulu Nellore": ["Buja Buja Nellore", "Gudur", "Kavali", "L.A.Sagaram", "Nellore", "Sulluru (Sullurpeta)", "Tada Khandrika", "Venkatagiri", "Vinnamala", "Yerrabalem"],
      "Srikakulam": ["Amadalavalasa (Amudalavalasa)", "Balaga", "Hiramandalam", "Ichchapuram", "Narasannapeta", "Palakonda", "Palasa Kasibugga", "Ponduru", "Rajam", "Sompeta", "Srikakulam", "Tekkali"],
      "Visakhapatnam": ["Anakapalle", "Bheemunipatnam", "Bowluvada", "Chintapalle", "Chodavaram", "Gudivada", "Kantabamsuguda", "Mulakuddu", "Nakkapalle", "Narsipatnam", "Payakaraopeta", "Peda Boddepalle", "Upper Sileru Project Site Camp", "Visakhapatnam (Vishakhapatnam)", "Yelamanchili"],
      "Vizianagaram": ["Bobbili", "Cheepurupalle (Cheepurupalli)", "Chintalavalasa", "Gajapathinagaram", "Jarjapupeta", "Kanapaka", "Kothavalasa", "Malicherla", "Nellimarla", "Parvathipuram", "Salur", "Sriramnagar", "Tummikapalle", "Vizianagaram"],
      "West Godavari": ["Bhimavaram", "Dwarakatirumala", "Eluru", "Gavaravaram", "Kovvur", "Narasapur", "Nidadavole (Nidadavolu)", "Palacole (Palakollu)", "Sanivarapupeta", "Satrampadu", "Tadepalligudem", "Tangellamudi", "Tanuku"],
      "Y.S.R.": ["Badvel", "Chennamukkapalle", "Dommara Nandyala", "Gopavaram", "Jammalamadugu", "Kadapa (Cuddapah)", "Mangampeta", "Modameedipalle", "Moragudi", "Muddanur", "Nagireddipalle", "Proddatur", "Pulivendla (Pulivendula)", "Rajampet", "Rameswaram", "Rayachoti", "Veparala", "Yerraguntla"]
    },
    "telangana": {
        "Siddipet": ["Cherial", "Dharmavaram", "Gooty", "Guntakal", "Hindupur", "Kadiri", "Kakkalapalle", "Kalyandurg", "Narayanapuram", "Papampeta", "Rayadurg", "Somandepalle", "Tadpatri (Tadipatri)", "Uravakonda", "Yenumalapalle"],
      }
  };

export default function App() {
  const [cityQuery, setCityQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const handleCityChange = (text) => {
    setCityQuery(text);
    // Filter cities based on input text
    if (text.trim().length > 0) {
      const filtered = Object.values(data).flatMap(districts =>
        Object.values(districts).flatMap(cities =>
          cities.filter(city => city.toLowerCase().includes(text.toLowerCase()))
        )
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);

    // Find the district and state of the selected city
    for (const state in data) {
      for (const district in data[state]) {
        if (data[state][district].includes(city)) {
          setSelectedDistrict(district);
          setSelectedState(state);
          return; // Exit loop once city is found
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search for a City:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type a city name..."
        value={cityQuery}
        onChangeText={handleCityChange}
      />
      
      {filteredCities.length > 0 && (
        <FlatList
          data={filteredCities}
          renderItem={({ item }) => (
            <Text
              style={styles.cityItem}
              onPress={() => handleCitySelect(item)}
            >
              {item}
            </Text>
          )}
          keyExtractor={(item) => item}
          style={styles.cityList}
        />
      )}

      <Text style={styles.label}>District:</Text>
      <TextInput
        style={styles.input}
        value={selectedDistrict}
        // editable={false}
      />
      
      <Text style={styles.label}>State:</Text>
      <TextInput
        style={styles.input}
        value={selectedState}
        // editable={false}
      />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  cityItem: {
    padding: 10,
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cityList: {
    width: '100%',
    maxHeight: 150,
    marginBottom: 10,
  },
});


