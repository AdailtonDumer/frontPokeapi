export interface PokemonType {
    id: number,
    name?: string,
    weight?: number,
    abilities: PokemonAbiliteType[],
    types: PokemonTypeType[]
    dataImage: string
}
export interface PokemonAbiliteType {
    id: number,
    pokemonId: number,
    description: string
}
export interface PokemonTypeType {
    id: number,
    pokemonId: number,
    description: string
}