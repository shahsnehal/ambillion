// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableFilter = ({ filterText, onFilter, onClear, placeholder }: any) => (
    <div className="mb-3">
        <div className="d-flex flex-column flex-sm-row">
            <input
                type="text"
                className="form-control mb-2 mb-sm-0 me-sm-2"
                placeholder={placeholder}
                aria-label="Search Input"
                aria-describedby="basic-addon1"
                value={filterText}
                onChange={onFilter}
            />
            <button className="btn bg-danger-subtle text-danger" type="button" onClick={onClear}>
                Reset
            </button>
        </div>
    </div>
);
