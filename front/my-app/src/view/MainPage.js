import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Wrapper = styled.section`
    padding: 20px;
   
`;
const FlexBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 50%;
    margin: 0 auto;
    box-shadow: 0px 0px 17px 5px rgba(0,0,0,0.28);
    border-radius: 32px;
    margin-bottom: 30px;
    padding: 20px;
`;
const FlexRow = styled.div`
    font-size: 16px;
    padding-bottom: 20px;
`;
const FlexRowSingielBook = styled(FlexRow)`
    align-self: flex-start;
`;
const FlexImgWrapper = styled.div`
    display: flex;
    justify-content: center;
`;
const WrapperImg = styled.div`
    width: 80%;
    padding-bottom: 20px;
`;
const ShowSelected = styled.div`
    margin: 20px 0 40px;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const StyledImg = styled.img`
    width: 100%;
    height: auto;
`;
const Button = styled.button`
    padding: 10px 50px;
    font-size: 20px;
    background: #fff200;
    cursor: pointer;
    color: black;
    border: 1px solid black;
    border-radius: 32px;
    transition: all 1s;
    &:hover{
        background: #00ae66;
    }
`;
const ButtonNext = styled(Button)`
    background: #00ae66;
    &:hover{
        background: #fff200;
    }
    margin: 0 auto;
`;



const MainPage = ({allBooks, appState}) =>{
    // const {isSelected, paymentValue} = payment;
    
    const [shoppingList, setShoppingList] = useState([]);
    const [showShoppingList, setShowShoppingList] = useState(false);
    const [shoppingListWithoutDuplicates, setShoppingListWithoutDuplicates] = useState(false);


   

    const addBook = (name)=>{
        let tempVals = [];
        tempVals.push([name]);
        setShoppingList(shoppingList.concat(tempVals));
    }
   
    const showHideListOfBooks = ()=>{
        const count = {};
        shoppingList.forEach(function(i) { count[i] = (count[i]||0) + 1;});
        setShoppingListWithoutDuplicates(count);

        setShowShoppingList(!showShoppingList);
    }
    const passParams = (id)=>{
        localStorage.setItem('products', Object.entries(shoppingListWithoutDuplicates).map(([key, value]) => {return ([[key] + ' '+ 'x ' + value])}));
       
    }

    if (allBooks === null) {
        return (
            <div>Loading...</div>
        )
    }
    return(
      <Wrapper>
          {console.log(allBooks.allData)}
          <ShowSelected>
              <Button onClick={()=>showHideListOfBooks()}>{showShoppingList === false ? 'PRZEJDŹ DO KOSZYKA' : 'WRÓĆ DO GŁÓWNEJ STRONY'}</Button>
          </ShowSelected>
          {showShoppingList === false && 
            <>
                {allBooks.allData.map((item)=> 
                    <FlexBox>
                        <FlexImgWrapper>
                            <WrapperImg>
                                    <StyledImg src={item.cover_url} alt="book"/>
                            </WrapperImg>
                        </FlexImgWrapper>
                        <FlexRow>Tytuł: {item.title}</FlexRow>
                        <FlexRow>Autor: {item.author}</FlexRow>
                        <FlexRow>Liczba stron: {item.pages}</FlexRow>
                        <FlexRow>Cena: {item.price} {item.currency}</FlexRow>
                        <Button onClick={()=>addBook(item.title)}>DODAJ DO KOSZYKA</Button>
                    </FlexBox>
                )}
            </>
          }
          {showShoppingList === true && 
            <FlexBox>
                <FlexRow>Wybrane Książki:</FlexRow>
                {Object.entries(shoppingListWithoutDuplicates).map(([key, value]) => {
                    return <FlexRowSingielBook>- {key}, ilość sztuk: {value}</FlexRowSingielBook>
                })}
                <Link
                onClick={()=>passParams()}
                to={{
                pathname:"/form", 
                state:{state:{shoppingListWithoutDuplicates}}
            }}>
                    <ButtonNext >DALEJ</ButtonNext>
                </Link>
            </FlexBox>
          }
          
         {console.log(shoppingList)}
         {console.log(shoppingListWithoutDuplicates, 'no dups')}
      </Wrapper>
       
    )
};

export default MainPage;