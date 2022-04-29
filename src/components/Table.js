import './css/table.css'

export const TableResult = (cotacoes, area) => {
    return (
        <table className="table_result" id="main_table">
            <thead>
                <tr>
                    <th>Seguradora</th>
                    <th>Área (HA)</th>
                    <th>Valor Saca</th>
                    <th>Nivel de Cobertura</th>
                    <th>Produtividade Garantida</th>
                    <th>LMGA Básica (R$)</th>
                    <th>LMGA Replantio (R$)</th>
                    <th>Prêmio Basica (R$)</th>
                    <th>Prêmio Replantio (R$)</th>
                    <th>Prêmio Total (R$)</th>
                    <th>Subvenção Federal (R$)</th>
                    <th>Prêmio C/Desconto Subv (R$)</th>
                    <th>Prêmio Médio S/Subv (R$/HA)</th>
                    <th>Prêmio Médio C/Subv (R$/HA)</th>
                </tr>
            </thead>
            <tbody>
                {
                    cotacoes.map(cotacao => {
                        return (
                            <tr key={cotacao.idCotacao}>
                                <td>{cotacao.idPlantioNavigation.idSeguradoraNavigation.nome}</td>
                                <td>{area}</td>
                                <td>{cotacao.valorSaca}</td>
                                <td>{cotacao.idPlantioNavigation.idNivelCoberturaNavigation.valor}</td>
                                <td>{cotacao.produtivadeGarantida.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })}</td>
                                <td>{cotacao.lmgabasica.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })}</td>
                                <td>{cotacao.valorLmgaReplantio.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })}</td>
                                <td>{cotacao.premioBasica.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })}</td>
                                <td>{cotacao.premioReplantio.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })}</td>
                                <td>{cotacao.premioTotal.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })}</td>
                                <td>{cotacao.subvencao.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })}</td>
                                <td>{cotacao.premioSubvencao.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })}</td>
                                <td>{cotacao.premioMedio.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })}</td>
                                <td>{cotacao.premioMedioSubvencao.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}