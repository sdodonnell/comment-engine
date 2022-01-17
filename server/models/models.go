package models

type CommentRank int

const (
	Low CommentRank = iota
	Medium
	High
)

type CommentSection struct {
	FullName string
	ShortName string
	Rank CommentRank
	CustomComment string
}

type Comment struct {
	StudentName string
	Course string
	TermDescription string
	Sections []CommentSection
	FutureComment string
}
