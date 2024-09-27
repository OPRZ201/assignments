import hashlib


def hash_value(value: str | bytes) -> str:
    if isinstance(value, str):
        value = value.encode()

    return hashlib.sha3_512(value).hexdigest()


def check_validity(raw_input: str, stored_hash: str) -> bool:
    return hash_value(raw_input) == stored_hash
