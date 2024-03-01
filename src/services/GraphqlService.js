// import React from 'react';
import { useQuery, gql } from '@apollo/client';

export const GET_DIABETIC_TIMELINE = gql`
  query DiabeticTimeLine($slug: String!) {
    diabeticTimeLineTrackers(filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          title
          slug
          timeLineTracker {
            title
            frequency
            frequencyType
            description
          }
        }
      }
    }
  }
`;

// export async function DiabeticTimeLineAPI(slug) {
    
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;
  
//     const diabeticTimeLineTrackers = data.diabeticTimeLineTrackers.data;
  
//     return diabeticTimeLineTrackers;
// };

