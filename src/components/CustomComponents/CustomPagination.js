import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = ({ totalCount, pageSize, page, onPageChange }) => {
    const handleChange = (event, value) => {
        onPageChange(value);
    };

    return (
        <Stack spacing={2}>
            <Pagination
                count={Math.ceil(totalCount / pageSize)}
                page={page}
                onChange={handleChange}
                variant="outlined"
                shape="rounded"
            />
        </Stack>
    );
};

export default CustomPagination;
