
import { ChangeEvent, FormEvent, useState } from "react"

import { countries } from "../../data/countries"
import sytle from '../module/Form.module.css'
import { SearchType } from "../../types";
import Alert from "../Alert/Alert.tsx";


type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
};

const Form = ({ fetchWeather }: FormProps) => {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    });

    const [alert, setAlert] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios')
            return;
        }

        fetchWeather(search);
    };

    return (
        <form
            className={sytle.form}
            onSubmit={handleSubmit}>
            {alert && <Alert>{alert}</Alert>}
            <div className={sytle.field}>
                <label htmlFor="city">Cuidad:</label>
                <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    value={search.city}
                    onChange={handleChange} />
            </div>

            <div className={sytle.field}>
                <label htmlFor="country">Pais:</label>
                <select
                    id='country'
                    name="country"
                    value={search.country}
                    onChange={handleChange}
                >
                    <option value=''>-- Seleccione un País --</option>
                    {countries.map(country => (
                        <option key={country.code} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <input className={sytle.submit} type="submit" value='Consultar Clima' />
        </form>
    )
};

export default Form