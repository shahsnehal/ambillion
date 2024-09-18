/**
 * A component that renders a filter input field with a reset button.
 * It allows users to enter text to filter table data and reset the filter.
 *
 * @param {TableFilterProps} props - The component props.
 * @returns {JSX.Element} The rendered TableFilter component.
 *
 * @example
 * <TableFilter
 *     filterText={filterText}
 *     onFilter={handleFilterChange}
 *     onClear={handleClear}
 *     placeholder="Search..."
 * />
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableFilter = ({ filterText, onFilter, onClear, placeholder }: any) => (
    <div className="d-flex flex-column flex-sm-row align-items-center gap-2">
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                placeholder={placeholder}
                aria-label="Search Input"
                aria-describedby="basic-addon1"
                value={filterText}
                onChange={onFilter}
            />
            <button className="btn btn-outline-danger" type="button" onClick={onClear}>
                Reset
            </button>
        </div>
    </div>
);
