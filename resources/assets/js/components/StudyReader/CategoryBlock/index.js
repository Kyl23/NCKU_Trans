import React from 'react';
import AdminEditCategory from './AdminCategoryManagement';
import Provider from './AdminCategoryManagement/Context/Provider';
import { BadgeList, CategoryBadge } from './style';

function CategoryBlock({ id, data }) {
    return (
        <BadgeList>
            {data.map((itemObj) => (
                <CategoryBadge key={itemObj['id']} value={itemObj['name']} />
            ))}
            {true && (
                <Provider value={{ id, data }}>
                    <AdminEditCategory />
                </Provider>
            )}
        </BadgeList>
    );
}

export default CategoryBlock;
