import React, { useContext, useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks'
import { Grid, Transition } from 'semantic-ui-react';
import ListCard from '../components/ListCard'
import { AuthContext } from '../auth.js';
import ListForm from '../components/ListForm'
import DeleteButton from '../components/DeleteButton';

function Home() {
    const { loading, data } = useQuery(FETCH_LISTS_QUERY)
    const { user } = useContext(AuthContext)

    const displayCards = [];

    if (loading) {

    }
    else {
        for (let i = 0; i < data.getLists.length; i++) {
            if (user){
                if (data.getLists[i].username === user.username) {
                    displayCards.push(data.getLists[i])
                }
            }
        }
    }

    return (
        <Grid columns={3}>
            <Grid.Row>
                <h1>separate</h1>
                {user && (
                    <Grid.Column>
                        <ListForm/>
                    </Grid.Column>
                )}
                {loading ? (
                    <h1></h1>
                ) : (
                    displayCards.map(list=>(
                        <Grid.Column key={list.id} style={{marginBottom: 20}}>
                            <ListCard list={list}/>
                            {/* <DeleteButton listId={list.id}/> */}
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    )
} 

const FETCH_LISTS_QUERY = gql` {
    getLists{
        id
        title
        username 
        createdAt 
        listItems {
            id 
            username 
            description
            isComplete
            createdAt
        }
    }
}
`

export default Home