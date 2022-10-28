FROM python:3.10
WORKDIR /code
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
COPY requirements.txt /code/
RUN chmod +x requirements.txt
RUN pip install -r requirements.txt
COPY . /opt/


