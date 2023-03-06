import {useState, useEffect} from "react"
import styled from "@emotion/styled"
import Error from "./Error"
import useSelectCurrencies from "../hooks/useSelectCurrencies"
import {currencies} from "../data/currencies"

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = ({setCurrencies}) => {
    const [cryptos, setCryptos] = useState([]);
    const [error, setError] = useState(false);
    const [currency, SelectCurrencies] = useSelectCurrencies('Elige tu Moneda', currencies);
    const [cryptocurrency, SelectCryptocurrency] = useSelectCurrencies('Elige tu Criptomoneda', cryptos);
    useEffect(() => {
        const consultAPI = async() => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
            const response = await fetch(url);
            const result = await response.json();
            const arrayCryptos = result.Data.map(crypto => {
                const object = {
                    id: crypto.CoinInfo.Name,
                    name:crypto.CoinInfo.FullName
                }
                return object;
            });
            setCryptos(arrayCryptos);
        }
        consultAPI();
    }, [])
    const handleSubmit = e => {
        e.preventDefault()
        if([currency, cryptocurrency]. includes('')) {
            setError(true);
            return;
        }
        setError(false);
        setCurrencies({
            currency,
            cryptocurrency
        })
    }
    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectCurrencies />
                <SelectCryptocurrency />
                <InputSubmit
                    type="submit"
                    value="Cotizar"
                />
            </form>
        </>
    )
}

export default Form;