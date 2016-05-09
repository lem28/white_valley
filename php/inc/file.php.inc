<?php
require_once("error.php.inc");
class file
{
	private $db;
	private $logger;
	public function __construct($ini_file)
	{
		$ini	  = parse_ini_file($ini_file, true);
		$logger   = new error_logger("logs/files.log");
		$this->db = new mysqli(
			$ini['db']['host'],
			$ini['db']['user'],
			$ini['db']['password'],
			$ini['db']['db']);
		if ($this->db->connect_errno > 0) {
			$this->logger->log("Failed to connect to database".$this->db->connect_error);
			exit(0);
		}
		echo "<p>Connected to db".PHP_EOL;
	}
	public function __destruct()
	{
		$this->db->close();
		echo "<p>Closed connection to db".PHP_EOL;
	}
	public function file_get($file_name)
	{
		$query = "select file_name from files where file_name='$file_name';";
		$results = $this->db->query($query);
		if (!$results) {
			$this->logger->log("error with results: ".$this->db->error);
			return 0;
		}
		$user = $results->fetch_assoc();
		if (isset($file_name["file_name"])) {
			return $file_name["file_name"];
		}
		return 0;
	}
	public function file_upload()
	{
		$file_name = $this->db->real_escape_string(basename($_FILES['file_up']['name']));
		$new_file_name = round(microtime(true)).'.'.$file_name;
		$host_url = "http://127.0.0.1/";
		$dir = "uploads/";
		$file_url = $host_url.$dir.$new_file_name;
		$now = date("m-d-y", time());		
		$query   = "
			insert into files
			(
				file_name,
				file_url,
				upload_date
			)
			values
			(
				'$file_name',
				'$file_url',
				'$now'
			);";
		
		$results = $this->db->query($query);
		if (move_uploaded_file($_FILES['file_up']['tmp_name'], $dir.$newfilename) && $results)
		{
			echo "<p> The file ".basename($file_name)." has been uploaded";
		}
		else
		{
			$this->logger->log("error with results: ".$this->db->error);
			echo "<p> Sorry, there was a problem uploading your file.";
		}
		return array(
			"success" => true
		);
	}
	public function file_browse()
	{
		$host_url = "http://127.0.0.1/";
		$dir = "uploads/";
		$files = glob($dir);
		$query = "select * from users where user_login = '$user_login';";
		foreach ($files as $file_name)
		{
			if ($file_name == $dir)
				continue;
			$file_url = '<a href="'.$host_url.$dir.$file_name.'">'.$file_name.'<a>';
			echo '<p>Filename: '.$file_name;
			echo '<p>URL: '.$file_url;
		}
		echo "<p>Finished loading";
	}
}
?>
