import { Product } from './types'

export default {

    fetch: fetch(
        'https://coding-challenge-api.aerolab.co/products', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDM4ZmE0MzdlNzE4NzAwMjBlMzhmMjkiLCJpYXQiOjE2MTQzNDY4MTl9.pgFKiyo1e4MPe7kOyKwh4MEsoCQyMWHLiYWn9jZ1T1Y',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'get',
        },
        )
        .then( res => res.json() )
        .then( products => products.map( (p): Product => ({
            id: p['_id'],
            name: p['name'],
            category: p['category'],
            cost: p['cost'],
            img: p['img']['url'],
        })) ),
    
    redeem: ( productId: string ) => fetch(
        'https://coding-challenge-api.aerolab.co/redeem', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDM4ZmE0MzdlNzE4NzAwMjBlMzhmMjkiLCJpYXQiOjE2MTQzNDY4MTl9.pgFKiyo1e4MPe7kOyKwh4MEsoCQyMWHLiYWn9jZ1T1Y',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({
                productId
            })
            },
        ),

}