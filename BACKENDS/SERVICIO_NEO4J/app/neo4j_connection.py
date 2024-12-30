from neo4j import GraphDatabase
import os

def get_neo4j_session():
    uri = os.getenv("URI_NEO")
    username = os.getenv("USERNAME_NEO")
    password = os.getenv("PASSWORD_NEO")
    # Verifica que las variables no estén vacías
    if not uri or not username or not password:
        raise ValueError("Faltan variables de entorno necesarias para la conexión a Neo4j")
    driver = GraphDatabase.driver(uri, auth=(username, password))
    return driver.session()