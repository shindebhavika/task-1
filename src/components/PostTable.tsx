import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Box, Typography } from '@mui/material';
import { Post } from '../InterFaces/post';
import Departments from './Departments';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, headerClassName: 'bold-header' },
  { field: 'userId', headerName: 'User ID', width: 90, headerClassName: 'bold-header' },
  { field: 'title', headerName: 'Title', width: 300, headerClassName: 'bold-header' },
  { field: 'body', headerName: 'Body', width: 500, headerClassName: 'bold-header' },
];

const PostTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container>
      <h1>Posts</h1>
      <Box sx={{ height: 600, width: '100%', mb: 4 ,borderColor:"red"}}>
        {error ? (
          <Typography variant="h6" color="error">
            Error: {error}
          </Typography>
        ) : (
          <DataGrid
            rows={posts}
            columns={columns}
           
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#1f6bb3',
                fontWeight: 'bolder',
              },
              '& .MuiDataGrid-cell': {
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e0e0e0',
              },
            }}
          />
        )}
      </Box>

      <Departments />
    </Container>
  );
};

export default PostTable;
