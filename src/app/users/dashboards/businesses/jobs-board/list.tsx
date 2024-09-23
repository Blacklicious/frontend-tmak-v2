import React, { useEffect, useState } from 'react';
import NavbarProfile from '../../navbarProfiles';
import JobApplicationPage from './applications/page';
import axios from 'axios';
import { message } from 'antd';
import CreateJobPage from './create'; // Import the CreateJobPage component

interface Business {
  id: number;
  name: string;
  logo: string;
  phone: string;
  email: string;
}

interface Job {
  id: number;
  title: string;
  description: string;
  company: string; // This should match the `company` field in the job data
}

interface JobListPageProps {
  locale: string;
  businessId: number; // This is the id of the selected business
}

const JobListPage: React.FC<JobListPageProps> = ({ locale, businessId }) => {
  const [jobs, setJobs] = useState<Job[]>([]);  
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);  
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch jobs from the API
  const fetchJobs = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      const response = await axios.get<Job[]>(`${process.env.NEXT_PUBLIC_API_URL}/news/jobs/api/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(response.data);
      setIsLoading(false);
    } catch (error) {
      message.error('Failed to fetch jobs');
      setIsLoading(false);
    }
  };

  // Filter jobs by businessId when either `jobs` or `businessId` changes
  useEffect(() => {
    if (businessId && jobs.length > 0) {
      const filtered = jobs.filter(job => job.company === businessId.toString());
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs); // If no businessId is selected, show all jobs
    }
  }, [businessId, jobs]);

  useEffect(() => {
    fetchJobs(); // Fetch jobs on component mount
  }, []);  // Only fetch jobs once

  const handleSelectJob = (job: Job) => {
    if (!selectedJobs.find((selectedJob) => selectedJob.id === job.id)) {
      setSelectedJobs([...selectedJobs, job]);
    }
  };

  const handleDeselectJob = (jobId: number) => {
    setSelectedJobs(selectedJobs.filter((job) => job.id !== jobId));
  };

  const handleDeleteJob = async (jobId: number) => {
    try {
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        message.error('User not authenticated');
        return;
      }

      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success('Job deleted successfully');
      fetchJobs(); // Re-fetch jobs after deletion
    } catch (error) {
      message.error('Failed to delete job');
    }
  };

  return (
    <div className="w-[100%] flex flex-col bg-gray-300 text-black p-2 rounded-lg">
      <div className="flex flex-col items-center">
        {/* Button to Create Job */}
        <div className="w-full">
          {businessId && <CreateJobPage locale={locale} businessId={businessId} />}
        </div>
        
        {/* List of Jobs */}
        <div className="w-full">
          {isLoading ? (
            <p>Loading jobs...</p>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`bg-white p-4 mb-2 shadow-md rounded-md hover:bg-gray-200 transition ${
                  selectedJobs.find((selectedJob) => selectedJob.id === job.id) ? 'border-l-4 border-yellow-500' : ''
                }`}
                onClick={() => handleSelectJob(job)}
              >
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p>{job.description}</p>
                {selectedJobs.find((selectedJob) => selectedJob.id === job.id) && (                  
                  <div className='flex flex-col items-end'>
                    <div className='flex justify-between w-full'>
                      <button
                        className="mb-2 border-2 border-yellow-500 bg-white/80 py-1 mt-2 w-[39%] h-[100%] text-yellow-500 rounded hover:bg-yellow-600 transition"
                        onClick={() => handleDeselectJob(job.id)}>Edit</button>
                      <button
                        className="mb-2 border-2 border-red-500/90 bg-white/80 py-1 mt-2 w-[39%] h-[100%] text-red-500 rounded hover:bg-red-600 transition"
                        onClick={() => handleDeselectJob(job.id)}
                      >
                        Deselection
                      </button>
                      <button
                        className="mb-2 border-2 bg-red-500/90 border-black py-1 mt-2 w-[19%] h-[100%] text-white rounded hover:bg-red-600 transition"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        Delete
                      </button>
                    </div>
                    
                    {/* Job Applications Page */}
                    <JobApplicationPage job={job.id} locale={locale} /> {/* Pass selected jobs to filter applications */}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>
      <NavbarProfile />
    </div>
  );
};

export default JobListPage;