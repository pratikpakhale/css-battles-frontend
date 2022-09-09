import React, { useState, useEffect, useCallback } from 'react'

import { useParams } from 'react-router-dom'

import { useHttpClient } from '../hooks/httpHook'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])

  const { sendRequest } = useHttpClient()

  const battleId = useParams().battleId

  const fetchLeaderboard = useCallback(async () => {
    try {
      const responseData = await sendRequest(`/battles/${battleId}/leaderboard`)
      console.log(responseData)
      let temp = responseData.submissions.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      )
      temp = temp.sort((a, b) => b.percentage - a.percentage)
      setLeaderboard(temp)
    } catch (err) {
      console.log(err)
    }
  }, [sendRequest, battleId])

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  return (
    <div className='overflow-x-auto relative px-10 mt-10 rounded'>
      <table className='w-full text-sm text-left text-gray-500 rounded-lg'>
        <thead className='text-xs text-gray-50 uppercase bg-tertiary'>
          <tr>
            <th scope='col' className='py-3 px-6'>
              Student Name
            </th>
            <th scope='col' className='py-3 px-6'>
              Reg. No.
            </th>
            <th scope='col' className='py-3 px-6'>
              % Match
            </th>
            <th scope='col' className='py-3 px-6'>
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map(submission => (
            <tr
              className='bg-gray-300 text-gray-800 font-medium border-b '
              key={submission._id}
            >
              <th
                scope='row'
                className='py-4 px-6  text-gray-900 font-abold whitespace-nowrap '
              >
                {submission.student.name}
              </th>
              <td className='py-4 px-6'>
                {submission.student.registrationNumber}
              </td>
              <td className='py-4 px-6'>{submission.percentage}</td>
              <td className='py-4 px-6'>
                {new Date(submission.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
