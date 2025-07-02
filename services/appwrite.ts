//track the searches made by a user.

import {Client, Databases, ID, Query} from 'react-native-appwrite'


const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;

const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

//set up new appwrite client
const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

//setting up database instance belonging to that appwrite client.

const database = new Databases(client)

export const updateSearchCount = async (query: string, movie: Movie)=> {
    try{
    //check everything we have in appwrite database
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('SEARCHTERM', query)
    ])
    
    //call the appwrite api to browse the document to check if 
    // the record of that search term already 


    if(result.documents.length > 0) {
        const existingMovie = result.documents[0];
        await database.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            existingMovie.$id,
            {
                count: existingMovie.count + 1
            }
        )
    }else {
        await  database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
         SEARCHTERM: query,
         movie_id: movie.id,
         count: 1,
         title: movie.title,
         poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        })
    }
    }catch(error){
        console.log(error)
        throw error
    }
    //if the document is found increment the search count field

    //if no documnt is found in that case is a new search term, so create a new document in appwrite database and initialise the count to 1
}