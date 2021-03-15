import { HistoryItem, User } from "./types";

export default {

    user: fetch(
        'https://coding-challenge-api.aerolab.co/user/me', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDM4ZmE0MzdlNzE4NzAwMjBlMzhmMjkiLCJpYXQiOjE2MTQzNDY4MTl9.pgFKiyo1e4MPe7kOyKwh4MEsoCQyMWHLiYWn9jZ1T1Y',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'get',
        },
        )
        .then( res => res.json() )
        .then( (user): User => ({
            id: user['_id'],
            name: user['name'],
            points: user['points'],
            // history: user['redeemHistory'],
        })),
    
    points: ( amount: number ) => fetch(
        'https://coding-challenge-api.aerolab.co/user/points', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDM4ZmE0MzdlNzE4NzAwMjBlMzhmMjkiLCJpYXQiOjE2MTQzNDY4MTl9.pgFKiyo1e4MPe7kOyKwh4MEsoCQyMWHLiYWn9jZ1T1Y',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({
                amount
            })
            },
        ),

    history: () => fetch(
        'https://coding-challenge-api.aerolab.co/user/history', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDM4ZmE0MzdlNzE4NzAwMjBlMzhmMjkiLCJpYXQiOjE2MTQzNDY4MTl9.pgFKiyo1e4MPe7kOyKwh4MEsoCQyMWHLiYWn9jZ1T1Y',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'get',
        },
        )
        .then( res => res.json() )
        .then( products => products.map( (p): HistoryItem => ({
            id: p['_id'],
            name: p['name'],
            category: p['category'],
            cost: p['cost'],
            img: p['img']['url'],
            itemId: p['productId'],
            date: p['createDate'],
        })) ),

}