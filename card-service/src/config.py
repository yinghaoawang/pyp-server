from dotenv import load_dotenv
import os

load_dotenv('../.env')


def is_running_in_docker():
    path = '/proc/1/cgroup'
    return os.path.exists(path) and any('docker' in line for line in open(path))


def get_config():
    return {
        'db': {
            'connectionString': os.getenv('DB_CONNECTION_STRING') if is_running_in_docker()
            else 'mongodb://localhost:27017/'
        }
    }
