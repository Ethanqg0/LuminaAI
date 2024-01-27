const stats = [
    { name: 'Hours Contributed', value: '405' },
    { name: 'Average tasks/project', value: '11.75' },
    { name: 'Projects Completed', value: '3' },
    { name: 'Projects On Time', value: '98%' },
  ]
  
  export default function Stats() {
    return (
      <div className="bg-gray-900 w-5/6 rounded-xl">
        <div className="mx-auto">
          <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-gray-900 px-4 py-6 sm:px-6">
                <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
                <p className="mt-2 flex items-baseline gap-x-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
                  {stat.unit ? <span className="text-sm text-gray-400">{stat.unit}</span> : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  