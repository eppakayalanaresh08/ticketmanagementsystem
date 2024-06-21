import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable, ActivityIndicator, ToastAndroid, Modal, Dimensions ,StatusBar} from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
// import { fetch } from 'expo-fetch';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { DropdownPicker } from 'react-native-dropdown-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { BlurView } from 'expo-blur';
import { DataTable } from 'react-native-paper';

const data = [
  { key: 'printer', value: 'printer' },
  { key: 'cartridge', value: 'cartridge' },
  // { key: 3, value: 'Item 3' },
];


const ProductPage = () => {

  // const fetchDataProduct=()=>{

  // }

  const [roleCheck, setRoleCheck] = useState('');
  const [getProducts, setProducts] = useState([])
  const [productName, setUserProductName] = useState('')
  const [price, setPrice] = useState('')
  const [getProductcategory, setproductcategory] = useState('')
  const [loading, setLoading] = useState(true);
  const [errorValue, setError] = useState({
    errorName: '',
    errorCategory: '',
    errorPrice: ''
  })

  const [openEditObjectProduct, setopenEditProduct] = useState('')
  const [openmodelProduct, setopenModelProduct] = useState(false)

  const [updatenewproduct, setupdatenewproduct] = useState(
    { name: '', category: '', price: '' }
  )








  async function fetchData() {
    const role = await AsyncStorage.getItem('rolecheck');
    setRoleCheck(role)
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');

      const url = 'https://shubhansh7777.pythonanywhere.com/product/'
      // const params = { id: 123, limit: 10 };
      // const url = new URL(baseUrl);
      // url.search = new URLSearchParams(params);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,

        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const productsdata=data.map((each)=>({
        ...each,
        category:each.category.toUpperCase(),
        name:each.name.toUpperCase()

      }))
      setProducts(productsdata)
      console.log(data); // Process the fetched data here
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  }



  useFocusEffect(
    React.useCallback(() => {
      // fetchDataProduct();
      fetchData()
    }, [])
  );


  // const onhandleProductSubmit = async() => {
  //   setLoading(true)
  //   const jwtToken = await AsyncStorage.getItem('jwtToken');

  //   const url = 'https://shubhansh7777.pythonanywhere.com/product/'; // Replace with your API endpoint
  //   const data = {
  //     name: productName,
  //     category:getProductcategory,
  //     price:price
  //   }; // Data to be sent as the request body

  //   const options = {
  //     method: 'POST', // Specify POST method
  //     headers: {
  //       'Content-Type': 'application/json', // Set appropriate content type for JSON data
  //       Authorization: `Bearer ${jwtToken}`,

  //     },
  //     body: JSON.stringify(data), // Stringify the data object for the request body
  //   };

  //   fetch(url, options)
  //   .then(response => response.json()) // Parse the JSON response
  //   .then(data => {
  //       console.log('POST request successful:', data);
  //       setProducts(prevData => [...prevData, data]);

  //       fetchData();
  //       // Handle successful response with the data received from the API
  //   })
  //   .catch(error => {
  //       console.error('POST request failed:', error);
  //       // Handle errors that may occur during the request
  //   });
  //   setLoading(false)

  //   setUserProductName('')

  //   setPrice('')
  //   getProductcategory('')
  // }


  const onhandleProductSubmit = async () => {
    setLoading(true);
    setError({ errorName: '', errorCategory: '', errorPrice: '' });
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');

      const url = 'https://shubhansh7777.pythonanywhere.com/product/'; // Replace with your API endpoint
      const data = {
        name: productName,
        category: getProductcategory,
        price: price,
      }; // Data to be sent as the request body

      const options = {
        method: 'POST', // Specify POST method
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(data), // Stringify the data object for the request body
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        // const { name = '', category = '', price = '' } = errorData.errors || {}; // Handle potential error structure
        setError({ errorName: errorData.name, errorCategory: errorData.category, errorPrice: errorData.price });

        // console.log(errorData,'new')

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newProduct = await response.json();
      setProducts(prevData => [...prevData, newProduct]);
      console.log('POST request successful:', newProduct);
      ToastAndroid.show('Successfully Added Product', ToastAndroid.SHORT);

    } catch (error) {
      // console.error('POST request failed:', error);
      // Handle errors here (e.g., display error message to user)
    } finally {
      setLoading(false);
      setUserProductName('');
      setPrice('');
      setproductcategory('');
    }
  };


  const [priceupdate, setupdateprice] = useState('')

  const [nameEditupdate, setNameEditupdate] = useState('')
  const [categoryeditupdate, setupdateCategory] = useState('')


  const handelEditProduct = (item) => {
    setopenEditProduct(item)
    // setupdatenewproduct({name:item.name,category:item.category,price:item.price})

    setupdateCategory(item.category)
    setNameEditupdate(item.name)
    setupdateprice(item.price.toString())
    setopenModelProduct(!openmodelProduct)
  }


  // const handelDeleteProduct=()=>{

  // }


  const deleteProduct = async(deleteid) => {
    setLoading(true); // Assuming you have a loading state for UI feedback

    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');

      const url = `https://shubhansh7777.pythonanywhere.com/product/${deleteid}/`; // Replace with your actual API endpoint

      const options = {
        method: 'DELETE', // Specify DELETE method
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Product deleted successfully');

      // Update your product list (consider refetching data or directly removing from state)
      const updatedProducts = getProducts.filter(product => product.id !== deleteid);
      setProducts(updatedProducts);
      setLoading(true)
      ToastAndroid.show('Successfully Delete Product', ToastAndroid.SHORT);


    } catch (error) {
      const updatedProducts = getProducts.filter(product => product.id !== deleteid);
      setProducts(updatedProducts);
      setLoading(true)
      ToastAndroid.show('Successfully Delete Product', ToastAndroid.SHORT);

      // console.error('Error deleting product:', error);
      // Handle errors here (e.g., display error message to user)
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (newValue) => {
    setproductcategory(newValue);
    // Update the state with the new selected value
  };

  const onhandleEditProductSubmit = async(productId) => {


    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const EditUpdateProduct = {
        name: nameEditupdate,
        category:categoryeditupdate,
        price: parseInt(priceupdate)
      }

      console.log(EditUpdateProduct,productId,'newedit')
      const response = await fetch(`https://shubhansh7777.pythonanywhere.com/product/${productId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(EditUpdateProduct)
      });

      if (!response.ok) {


        const errorDataProductEdit = await response.json();
        console.log(errorDataProductEdit, 'newupdate')

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const newerrorDataProductEdit = JSON.parse(response);
      // console.log(newerrorDataProductEdit,'newvalue')
      await fetchData(); 
      setLoading(true)
      // Optionally, you can refetch the data after updating
      // await fetchData();
      // setOpenModelProduct(false); // Close the modal
    } catch (error) {
      console.error('new',error);
    }

    // Handle product submit
    setopenModelProduct(false); // Close modal
    setLoading(false)
  };

  console.log(updatenewproduct.category)
  console.log(priceupdate, 'price')













  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, setItemsPerPage] = React.useState(numberOfItemsPerPageList[0]);

  const [items] = React.useState([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);






  return (
    // <>
    //   <View>

    //     <View style={styles.modalView}>
    //       <View style={{ marginVertical: responsiveHeight(0.1) }}>
    //         <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}> Name</Text>
    //         <TextInput
    //           style={styles.inputElement}
    //           onChangeText={data => setUserProductName(data)}
    //           value={productName}
    //         />
    //         {errorValue && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>{errorValue.errorName}</Text>}
    //       </View>





    //       <View style={{ marginVertical: responsiveHeight(0.1) }}>
    //         <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>Category</Text>

    //         <View style={{ width: responsiveHeight(30), minHeight: responsiveHeight(2) }}
    //         >
    //           <SelectList
    //             data={data}
    //             setSelected={handleOnChange} // Pass the onChange handler function
    //             search={false}
    //           // Optional: disable search functionality
    //           />
    //         </View>
    //         {errorValue && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>{errorValue.errorCategory}</Text>}

    //       </View>
    //       <View style={{ marginVertical: responsiveHeight(0.1) }}>
    //         <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>Price</Text>
    //         <TextInput
    //           style={styles.inputElement}
    //           onChangeText={data => setPrice(data)}
    //           value={price}
    //         />
    //         {errorValue && <Text style={{ color: 'red', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>{errorValue.errorPrice}</Text>}
    //       </View>


    //       {/* <Text style={styles.modalText}>Hello World!</Text> */}
    //       <View style={{ flexDirection: 'row' }}>
    //         <Pressable
    //           style={[styles.button, styles.buttonSubmit]}
    //           onPress={onhandleProductSubmit}
    //         >
    //           <Text style={styles.textStyle}>Submit</Text>
    //         </Pressable>




    //       </View>
    //     </View>



    //   </View>

    //   {loading ?
    //     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
    //       <ActivityIndicator animating={loading} size="large" color="#0000ff" />
    //     </View> :
    //     <>
    //       <ScrollView>
    //         <View style={styles.table}>
    //           <View style={styles.row}>
    //             <Text style={styles.cellhead}>Id</Text>

    //             <Text style={styles.cellhead}> Name</Text>
    //             <Text style={styles.cellhead}> Category</Text>

    //             <Text style={styles.cellhead}>Price</Text>

    //             {'manager' === roleCheck ? <Text style={styles.cellhead}>Action</Text> : ''}


    //           </View>




    //           {
    //             getProducts.map((item, index) => (
    //               <View style={styles.row} key={index}>
    //                 <Text style={styles.cell}>{item.id}</Text>

    //                 <Text style={styles.cell}>{item.name}</Text>
    //                 <Text style={styles.cell}>{item.category}</Text>

    //                 <Text style={styles.cell}>{item.price}</Text>

    //                 {'manager' === roleCheck ? <View style={[styles.cellAction, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
    //                   <TouchableOpacity onPress={() => handelEditProduct(item)} style={[{ minWidth: responsiveHeight(3), paddingVertical: 2, marginHorizontal: responsiveHeight(0.2), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveHeight(1), backgroundColor: '#52c41a', borderRadius: 5 }]}>
    //                     <MaterialIcons name="edit" size={15} color="#ffffff" />
    //                     {/* <Text style={{ color: '#ffffff', fontSize: responsiveFontSize(1.2) }}>Delete</Text> */}
    //                   </TouchableOpacity>
    //                   <TouchableOpacity onPress={() => deleteProduct(item.id)} style={[{ minWidth: responsiveHeight(3), paddingVertical: 2, marginHorizontal: responsiveHeight(0.2), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#dc3545', borderRadius: 5 }]}>
    //                     <MaterialIcons name="delete" size={15} color="#ffffff" />
    //                     {/* <Text style={{ color: '#ffffff', fontSize: responsiveFontSize(1.2) }}>Delete</Text> */}
    //                   </TouchableOpacity>

    //                 </View> : ''}



    //               </View>




    //             ))}


    //         </View>

    //       </ScrollView>

    //       <Modal
    //         animationType="slide"
    //         transparent={true}
    //         visible={openmodelProduct}
    //         onRequestClose={() => {
    //           // Alert.alert('Modal has been closed.');
    //           setopenModelProduct(!openmodelProduct);
    //         }}>
    //         <View style={styles.centeredView}>
    //           <View style={styles.modalView}>
    //             <View style={{ marginVertical: responsiveHeight(1) }}>
    //               <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>Name</Text>
    //               <TextInput
    //                 style={styles.inputElement}
    //                 onChangeText={data => setupdateprice(data)}
    //                 value={nameEditupdate} />
    //             </View>
    //             <View style={{ marginVertical: responsiveHeight(1) }}>
    //               <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>Category</Text>
    //               <TextInput
    //                 style={styles.inputElement}
    //                 value={categoryeditupdate}
    //                 editable={false}

    //               />

    //               <Text style={{ color: 'red' }}>Note: Category cannot be edited</Text>
    //             </View>

    //             <View style={{ marginVertical: responsiveHeight(1) }}>
    //               <Text style={{ color: 'gray', fontWeight: 500, fontSize: responsiveFontSize(1.5) }}>Price</Text>
    //               <TextInput
    //                 style={styles.inputElement}
    //                 onChangeText={data => setupdateprice(data)}
    //                 value={priceupdate} />
    //             </View>


    //             <View style={{ flexDirection: 'row' }}>
    //               <Pressable
    //                 style={[styles.button, styles.buttonSubmit]}
    //               >
    //                 <Text style={styles.textStyle}>Submit</Text>
    //               </Pressable>



    //               <Pressable
    //                 style={[styles.button, styles.buttonClose]}
    //                 onPress={() => setopenModelProduct(!openmodelProduct)}
    //               >
    //                 <Text style={styles.textStyle}>Close</Text>
    //               </Pressable>
    //             </View>

    //           </View>
    //         </View>
    //       </Modal>
    //     </>

    //   }
    // </>
    <>
      <View>
      <StatusBar style="dark" />

        {openmodelProduct && (
          <BlurView intensity={230} style={[styles.absolute, { height: Dimensions.get('window').height }]} tint="light" />
        )}
        <View style={styles.modalView}>
          <View style={{ marginVertical: responsiveHeight(0.1) }}>
            <Text style={{ color: 'gray', fontWeight: '500', fontSize: responsiveFontSize(1.2) }}> NAME</Text>
            <TextInput
              style={styles.inputElement}
              onChangeText={data => setUserProductName(data)}
              value={productName}
            />
            {errorValue && <Text style={{ color: 'red', fontWeight: '500', fontSize: responsiveFontSize(1.2) }}>{errorValue.errorName}</Text>}
          </View>
          <View style={{ marginVertical: responsiveHeight(0.1) }}>
            <Text style={{ color: 'gray', fontWeight: '500', fontSize: responsiveFontSize(1.2) }}>CATEGORY</Text>
            <View style={{ width: responsiveHeight(30), minHeight: responsiveHeight(2) }}>
              <SelectList
                data={data}
                setSelected={handleOnChange}
                search={false}
              />
            </View>
            {errorValue && <Text style={{ color: 'red', fontWeight: '500', fontSize: responsiveFontSize(1.2) }}>{errorValue.errorCategory}</Text>}
          </View>
          <View style={{ marginVertical: responsiveHeight(0.1) }}>
            <Text style={{ color: 'gray', fontWeight: '500', fontSize: responsiveFontSize(1.2) }}>PRICE</Text>
            <TextInput
              style={styles.inputElement}
              onChangeText={data => setPrice(data)}
              value={price}
            />
            {errorValue && <Text style={{ color: 'red', fontWeight: '500', fontSize: responsiveFontSize(1.2) }}>{errorValue.errorPrice}</Text>}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={[styles.button, styles.buttonSubmit]}
              onPress={onhandleProductSubmit}
            >
              <Text style={styles.textStyle}>SUBMIT</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {loading ? (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={loading} size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          {openmodelProduct && (
            <BlurView intensity={230} style={[styles.absolute, { height: Dimensions.get('window').height }]} tint="light" />
          )}
          <ScrollView>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.cellhead}>ID</Text>
                <Text style={styles.cellhead}>NAME</Text>
                <Text style={styles.cellhead}>CATEGORY</Text>
                <Text style={styles.cellhead}>PRICE</Text>
                {(roleCheck === 'manager' || roleCheck === 'admin') && <Text style={styles.cellhead}>ACTION</Text>}
              </View>
              {getProducts.map((item, index) => (
                <View style={styles.row} key={index}>
                  <Text style={styles.cell}>{item.id}</Text>
                  <Text style={styles.cell}>{item.name}</Text>
                  <Text style={styles.cell}>{item.category}</Text>
                  <Text style={styles.cell}>{item.price}</Text>
                  {(roleCheck === 'manager' || roleCheck === 'admin')  && (
                    <View style={[styles.cellAction, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                      <TouchableOpacity
                        onPress={() => handelEditProduct(item)}
                        style={[{ minWidth: responsiveHeight(3), paddingVertical: 2, marginHorizontal: responsiveHeight(0.2), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveHeight(1), backgroundColor: '#52c41a', borderRadius: 5 }]}
                      >
                        <MaterialIcons name="edit" size={15} color="#ffffff" />
                      </TouchableOpacity>
                      {roleCheck === 'admin' && (
                      <TouchableOpacity
                        onPress={() => deleteProduct(item.id)}
                        style={[{ minWidth: responsiveHeight(3), paddingVertical: 2, marginHorizontal: responsiveHeight(0.2), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#dc3545', borderRadius: 5 }]}
                      >
                        <MaterialIcons name="delete" size={15} color="#ffffff" />
                      </TouchableOpacity>)}
                    </View>
                  )}
                </View>
              ))}
            </View>
            {/* <DataTable>
      <DataTable.Header>

        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title numeric>Calories</DataTable.Title>
        <DataTable.Title numeric>Fat</DataTable.Title>
      </DataTable.Header>

      {getProducts.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell numeric>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.category}</DataTable.Cell>
          <DataTable.Cell numeric>{item.price}</DataTable.Cell>

        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(newPage) => setPage(newPage)}
        label={`${from + 1}-${to} of ${items.length}`}
        optionsPerPage={numberOfItemsPerPageList}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </DataTable> */}
          </ScrollView>

          <Modal
            animationType="slide"
            transparent={true}
            visible={openmodelProduct}
            onRequestClose={() => {
              setopenModelProduct(!openmodelProduct);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ marginVertical: responsiveHeight(1) }}>
                  <Text style={{ color: 'gray', fontWeight: '500', fontSize: responsiveFontSize(1.2) }}>NAME</Text>
                  <TextInput
                    style={styles.inputElement}
                    onChangeText={data => setNameEditupdate(data)}
                    value={nameEditupdate}
                  />
                </View>
                <View style={{ marginVertical: responsiveHeight(1.1) }}>
                  <Text style={{ color: 'gray', fontWeight: '500', fontSize: responsiveFontSize(1.2) }}>CATEGORY</Text>
                  <TextInput
                    style={styles.inputElement}
                    value={categoryeditupdate}
                    editable={false}
                  />
                  <Text style={{ color: 'red',fontSize:responsiveFontSize(1) }}>Note: Category cannot be edited</Text>
                </View>
                <View style={{ marginVertical: responsiveHeight(1) }}>
                  <Text style={{ color: 'gray', fontWeight: '500', fontSize: responsiveFontSize(1.2) }}>PRICE</Text>
                  <TextInput
                    style={styles.inputElement}
                    onChangeText={data => setupdateprice(data)}
                    value={priceupdate}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Pressable
                    style={[styles.button, styles.buttonSubmit]}
                    onPress={() => onhandleEditProductSubmit(openEditObjectProduct.id)}
                  >
                    <Text style={styles.textStyle}>SUBMIT</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setopenModelProduct(!openmodelProduct)}
                  >
                    <Text style={styles.textStyle}>CLOSE</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </>
  )
}

export default ProductPage

const styles = StyleSheet.create({
  table: {
    borderWidth: 0.1,
    borderColor: "#DCDCDC",
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cellhead: {
    width: responsiveHeight(8),
    height: responsiveHeight(4),
    borderWidth: 0.5,
    // display:'flex',
    // flex:1,

    color: "#ffffff",
    fontSize: responsiveFontSize(1.2),
    textAlign: 'center',
    fontWeight: '500',
    borderColor: "black",
    flex: 1,
    backgroundColor: '#0083c2',
    paddingTop:responsiveHeight(0.5)
 
  },
  cell: {
    flex: 1,
    borderWidth: 0.5,
    width: responsiveHeight(8),
    height: responsiveHeight(8),
    textAlign: "center",
    
    fontSize: 10,
    color: "black",
    borderColor: "black",
    flexWrap: 'wrap',
  },
  cellAction: {
    flex: 1,
    borderWidth: 0.5,
    height: responsiveHeight(8),
    flexDirection: 'row',
    textAlign: "center",
    fontSize: 10,
    borderColor: "black",
  },
  cellid: {
    paddingTop: 10,
    borderWidth: 0.5,
    width: responsiveHeight(8),
    height: responsiveHeight(8),
    textAlign: "center",
    fontSize: 10,
    color: "black",
    borderColor: "black",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal: responsiveHeight(2),
  },
  buttonSubmit: {
    marginTop: responsiveHeight(1),
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  celltextdelete: {
    fontSize: responsiveFontSize(1),
    marginLeft: responsiveHeight(1.5),
  },
  inputElement: {
    height: responsiveHeight(4),
    width: responsiveHeight(30),
    fontSize:responsiveFontSize(1.2),
    paddingLeft:responsiveHeight(1),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  buttonClose: {
    marginTop: responsiveHeight(1),
    backgroundColor: '#2196F3',
  },
  absolute: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
})