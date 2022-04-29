import Header from "../components/Header";
import { TableResult } from '../components/Table'
import { useState, useEffect } from "react";

import api from '../services/api'

import './css/cotacao.css'

function Cotacao() {
    const [idSeguradora, setIdSeguradora] = useState(0);
    const [idCultura, setIdCultura] = useState(0);
    const [idUf, setIdUf] = useState(0);
    const [idMunicipio, setIdMunicipio] = useState(0);
    const [idNivelCobertura, setIdNivelCobertura] = useState(0);
    const [idPlantioBuscado, setIdPlantioBuscado] = useState(0);
    const [area, setArea] = useState();

    const [cotacoes, setCotacoes] = useState([]);
    const [seguradoras, setSeguradoras] = useState([]);
    const [culturas, setCulturas] = useState([]);
    const [ufs, setUfs] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [niveisCobertura, setNiveisCobertura] = useState([]);

    function buscarSeguradoras() {
        api.get('seguradoras')
            .then(response => {
                if (response.status === 200) {
                    setSeguradoras(response.data)
                }
            })
            .catch(erro => {
                console.log(erro);
            })
    }

    function buscarCulturas() {
        api.get('culturas')
            .then(response => {
                if (response.status === 200) {
                    setCulturas(response.data)
                }
            })
            .catch(erro => {
                console.log(erro);
            })
    }

    function buscaUfs() {
        api.get('ufs')
            .then(response => {
                if (response.status === 200) {
                    setUfs(response.data)
                }
            })
            .catch(erro => {
                console.log(erro);
            })
    }

    function buscarMunicipios() {
        api.get(`municipios/uf/${idUf}`)
        .then(response => {
            if (response.status === 200){
                setMunicipios(response.data)
            }
        })
        .catch(erro => {
            console.log(erro);
        })
    }

    function buscarNiveisCobertura() {
        api.get("niveisCobertura")
        .then(response => {
            if (response.status === 200) {
                setNiveisCobertura(response.data)
            }
        })
        .catch(erro => {
            console.log(erro)
        })
    }

    function buscaIdPlantio() {
        const dataPlantio = {
            idSeguradora : idSeguradora,
            idNivelCobertura : idNivelCobertura,
            idCultura : idCultura,
            idMunicipio: idMunicipio
        }

        console.log(dataPlantio)

        api.post("plantios/info",dataPlantio,{})
            .then(response => {
                if (response.status === 200) {
                    setIdPlantioBuscado(response.data.idPlantio)
                    console.log(idPlantioBuscado)
                } 
                else {
                    setIdPlantioBuscado(0)
                    setCotacoes([])
                }
            })
            .catch(erro => {
                console.log(erro)
                setCotacoes([])
            })
    }

    async function fazerCotacoes() {

        console.log("cheguei")

        const dataCotcacao = {
            area : area
        }
        
        await api.post(`cotacoes/${idPlantioBuscado}`,dataCotcacao)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    setCotacoes(response.data)
                    console.log(cotacoes)
                }
            })
            .catch(erro => {
                console.log(erro);
            })
    }

    useEffect(() => {
        buscarSeguradoras()
        buscarCulturas()
        buscaUfs()
        buscarNiveisCobertura()
    }, [])

    useEffect(() => {
        buscarMunicipios()
    }, [idUf])

    useEffect(() => {
        fazerCotacoes()
    }, [idPlantioBuscado])


    return (
        <div>
            <Header></Header>

            <main className="grid ctc_main">
                <div className="ctc_inputs_container">

                    <select onChange={campo => setIdSeguradora(campo.target.value)}
                        required className="input select" name="Seguradora" id="">

                        <option value="0" disabled selected hidden>Seguradora</option>
                        {seguradoras.map(seguradora => {
                            return (
                                <option value={seguradora.idSeguradora}>{seguradora.nome}</option>
                            )
                        })}
                    </select>

                    <select onChange={campo => setIdCultura(campo.target.value)}
                        required className="input select" name="Cultura" id="">
                        <option value="0" disabled selected hidden>Cultura</option>
                        {culturas.map(cultura => {
                            return (
                                <option value={cultura.idCultura}>{cultura.nome}</option>
                            )
                        })}
                    </select>

                    <select onChange={campo => setIdUf(campo.target.value)}
                            required className="input select" name="Cultura" id="">
                        <option value="0" disabled selected hidden>UF</option>
                        {ufs.map(uf => {
                            return (
                                <option value={uf.idUf}>{uf.titulo}</option>
                            )
                        })}
                    </select>

                    <select onChange={campo => setIdMunicipio(campo.target.value)}
                            required className="input select" name="Municipio" id="">
                        <option value="0" disabled selected hidden>Municipio</option>
                        {municipios.map(m => {
                            return (
                                <option value={m.idMunicipio}>{m.nome}</option>
                            )
                        })}
                    </select>

                    <select onChange={campo => setIdNivelCobertura(campo.target.value)}
                            required className="input select" name="Municipio" id="">
                        <option value="0" disabled selected hidden>Nivel Cobertura</option>
                        {niveisCobertura.map(n => {
                            return (
                                <option value={n.idNivelCobertura}>{n.valor}</option>
                            )
                        })}
                    </select>

                    <input  onChange={campo => setArea(campo.target.value)} value={area}
                            placeholder="Area" className="input" type="number" name="Area" />

                    <button onClick={buscaIdPlantio} className="btn">Cotar</button>
                </div>

                {cotacoes.length !== 0 &&
                    TableResult(cotacoes, area)
                    }

                {cotacoes.length !== 0 &&
                    <button className="btn">Imprimir Cotação</button>
                }

                
            </main>
        </div>
    );
}

export default Cotacao;