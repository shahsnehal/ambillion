// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableFilter = ({ filterText, onFilter, onClear }: any) => (
    <div className="mb-3 col-sm-12 col-md-6 col-lg-4 col-xxl-4">
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Filter By Email"
                aria-label="Search Input"
                aria-describedby="basic-addon1"
                value={filterText}
                onChange={onFilter}
            ></input>
            <button className="btn bg-danger-subtle text-danger" type="button" onClick={onClear}>
                Reset
            </button>
        </div>
    </div>
);
