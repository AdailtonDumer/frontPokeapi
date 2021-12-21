import { ChangeEvent, createRef, useEffect, useState } from "react";
import { PokemonAbiliteType, PokemonType, PokemonTypeType } from '../types/types'
import { useParams } from 'react-router-dom'
import api from "../services/api";
import { useNavigate } from "react-router-dom";
const headerImg = require('../assets/headerImg.png')

export function NewPokemon() {
    const navigate = useNavigate()
    const [Pokemon, setPokemon] = useState<PokemonType>();
    const [img, setImg] = useState(Pokemon?.dataImage);
    const [name, setName] = useState(Pokemon?.name);
    const [weight, setWeight] = useState<number>(Pokemon?.weight || 0);
    const [abilities, setAbilities] = useState<PokemonAbiliteType[]>(Pokemon?.abilities || []);
    const [ability, setAbility] = useState("")
    const [types, setTypes] = useState<PokemonTypeType[]>(Pokemon?.types || []);
    const [type, setType] = useState("")
    const params = useParams();

    useEffect(() => {
        getPokemon()
    }, []);

    function handleSave() {
        var poke: PokemonType = {
            id: 0,
            name: name,
            dataImage: img || '',
            weight: weight,
            abilities: abilities,
            types: types
        }

        api.post('pokemon', poke).then((res) => {
            const pokemonSaved = res.data as PokemonType;
            alert(`Pokemon criado com sucesso Código ${pokemonSaved.id}`)
            navigate('/')
        })
    }

    function handleEdit() {
        var poke: PokemonType = {
            id: parseInt(params.id || '0'),
            name: name,
            dataImage: img || '',
            weight: weight,
            abilities: abilities,
            types: types
        }

        api.put(`pokemon/${params.id}`, poke).then((res) => {
            const pokemonSaved = res.data as PokemonType;
            alert(`Pokemon editado com sucesso`)
            navigate('/')
        })
    }

    function handleDelete(){
        if(!params?.id)
            return
        api.delete(`pokemon/${params.id}`).then((res) => {
            alert(`Pokemon excluído com sucesso`)
            navigate('/')
        })
        
    }

    async function getPokemon() {
        if (params.id) {
            const pokemonDatabase = await api.get(`pokemon/${params.id}`).then(res => res.data as PokemonType);

            if (!pokemonDatabase) {
                alert("Pokemon não encontrado no banco de dados");
                navigate('/');
            }

            console.log(pokemonDatabase);

            setPokemon(pokemonDatabase);
            setName(pokemonDatabase.name);
            setImg(pokemonDatabase.dataImage);
            setWeight(pokemonDatabase.weight ?? 0);
            setAbilities(pokemonDatabase.abilities || []);
            setTypes(pokemonDatabase.types || []);
        }
    }

    const imageRef = createRef<HTMLInputElement>();

    function changeImage(img: ChangeEvent<HTMLInputElement>) {
        const input = img.target

        if (input.files && input.files[0]) {
            const file = input.files[0];

            if (!file.type.startsWith("image"))
                return

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result)
                    setImg(e.target?.result?.toString())

                console.log(e.target?.result)
            }
            reader.readAsDataURL(file)
        }
    }

    function handleAddAbility() {
        setAbilities([...abilities, { id: 0, pokemonId: 0, description: ability }]);
        setAbility('')
    }
    function handleAddType() {
        setTypes([...types, { id: 0, pokemonId: 0, description: type }]);
        setType('')
    }
    return (
        <>
            <div className="form">
                <input type="text" name="Name" id="Name" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="number" name="weight" id="weight" placeholder="Peso" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} />

                <input type="text" name="ability" id="ability" placeholder="Habilidade" value={ability} onChange={(e) => setAbility(e.target.value)} />
                <button onClick={handleAddAbility} className="btn">+</button>

                <input type="text" name="type" id="type" placeholder="Tipo" value={type} onChange={(e) => setType(e.target.value)} />
                <button onClick={handleAddType} className="btn">+</button>
            </div>
            <div className="row">
                <div className="box">
                    <h4>Habilidades</h4>
                    <div className="listCards">
                        {
                            abilities.map((el, i) => {
                                return (
                                    <div key={i} className="card">
                                        <p>{el.description}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="box">
                    <h4>Tipos</h4>
                    <div className="listCards">
                        {
                            types.map((el, i) => {
                                return (
                                    <div key={i} className="card">
                                        <p>{el.description}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="col">
                <input type="file" name="Image" id="img" onChange={changeImage} accept='image/*' ref={imageRef} hidden />
                <img src={img || headerImg} alt="Pokémon image" className="image" />
                <button className="btn" onClick={() => imageRef.current?.click()}>
                    Trocar Imagem
                </button>
            </div>
            <div className="listCards">
                <button className="btn" hidden={params.id !== undefined} onClick={handleSave}>Salvar</button>
                <button className="btn" hidden={params.id === undefined} onClick={handleEdit}>Salvar</button>
                <button className="btn" hidden={params.id === undefined}  onClick={handleDelete}>Excluir</button>
            </div>
        </>
    )
}