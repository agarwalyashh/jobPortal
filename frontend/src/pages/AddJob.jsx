import { useState } from "react";
import { JobCategories, JobLocations } from "../helper";

function AddJob() {
  const jobCatgories = JobCategories;
  const jobLocations = JobLocations;
  const [title, setTile] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState(0);
  const [location, setLocation] = useState(jobLocations[0]);
  const [category, setCategory] = useState(jobCatgories[0]);
  function handleSubmit(e) {
    e.preventDefault();
    const job = {
      title,
      description,
      salary,
      location,
      category,
    };
    console.log(job);
  }
  return (
    <form
      className="text-gray-500 p-2 sm:p-4 flex flex-col gap-4 md:gap-6 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[40%] text-sm md:text-base"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Job Title"
        className="focus:outline-none rounded-sm border-1 p-1 sm:p-2"
        value={title}
        onChange={(e) => setTile(e.target.value)}
        required
      />
      <textarea
        type="text"
        placeholder="Job Desctiption"
        className="focus:outline-none rounded-sm border-1 p-1 sm:p-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <div className="flex gap-4 md:gap-6 items-center">
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Job Category</label>
          <select
            className="p-1 sm:p-2 border-1 rounded-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {jobCatgories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Job Location</label>
          <select
            className="p-1 sm:p-2 border-1 rounded-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {jobLocations.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          className="focus:outline-none rounded-sm border-1 p-1 sm:p-2"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-500 px-2 md:px-4 lg:px-6 py-1 md:py-2 rounded-sm cursor-pointer hover:bg-blue-600 text-xs sm:text-sm lg:text-base"
      >
        Add Job
      </button>
    </form>
  );
}

export default AddJob;
