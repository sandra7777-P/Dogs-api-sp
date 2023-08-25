import React from 'react';
import { connect } from 'react-redux';
import { toggleSortOrder, updateSortedList } from '../../redux/actions';

function Sort({ sortOrder, toggleSortOrder, filteredData, updateSortedList }) {
    const handleToggleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        toggleSortOrder();
        const sortedList = [...filteredData];
        sortedList.sort((a, b) => {
            if (newSortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
        updateSortedList(sortedList); // Dispatch the action to update the sorted list
    };

    return (
        <div>
            <label>
                Ascending{' '}
                <input
                    type="checkbox"
                    checked={sortOrder === 'asc'}
                    onChange={handleToggleSort}
                />
            </label>
        </div>
    );
}

const mapStateToProps = (state) => ({
    sortOrder: state.sortOrder,
    filteredData: state.filteredData,
});

const mapDispatchToProps = {
    toggleSortOrder,
    updateSortedList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
